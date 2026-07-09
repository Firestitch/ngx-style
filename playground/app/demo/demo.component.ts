import {
  AfterViewInit,
  booleanAttribute,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  NgZone,
  numberAttribute,
  OnDestroy,
  ViewChild,
} from '@angular/core';

import { fromEvent, merge, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { DemoRegistryService } from './demo-registry.service';
import { FsInspectDirective } from './inspect.directive';
import { readTokens } from './tokens';


interface DemoAttribute {
  name: string;
  value: string;
}

interface DemoTarget {
  directive: FsInspectDirective;
  tag: string;
  label: string;
  classes: string;
  attrs: DemoAttribute[];
}

interface BreakpointRange {
  name: string;
  label: string;
  max: number;
}

/** Angular's own bookkeeping and the directive's selector attribute are not part of the lesson. */
const IGNORED_ATTRIBUTE = /^(class|style|id|fsinspect)$|^_ng|^ng-/i;

/**
 * A chip should show what you would type. Angular's bookkeeping (`ng-star-inserted`), Material's
 * own classes (`mat-mdc-form-field`) and the playground's filler (`demo-box`) are none of them
 * authored, so they never belong on one.
 */
const IGNORED_CLASS = /^(_?ng|demo|mat|mdc|cdk)-/;

const FRAME_MIN_WIDTH = 320;

/** Wide enough to cross the largest breakpoint and light up the `gt-lg` attributes. */
const FRAME_MAX_WIDTH = 2000;

@Component({
  selector: 'fs-demo',
  templateUrl: './demo.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  providers: [DemoRegistryService],
})
export class FsDemoComponent implements AfterViewInit, OnDestroy {

  @Input() public caption = '';
  @Input() public description = '';

  /** Renders the stage inside an iframe so the breakpoints follow the frame, not the browser. */
  @Input({ transform: booleanAttribute }) public viewport = false;

  @Input({ transform: numberAttribute }) public width = 560;

  @ViewChild('content', { static: true }) private _content: ElementRef<HTMLElement>;
  @ViewChild('frame') private _frame: ElementRef<HTMLIFrameElement>;

  public targets: DemoTarget[] = [];
  public frameWidth = 560;
  public ranges: BreakpointRange[] = [];

  public readonly minWidth = FRAME_MIN_WIDTH;
  public readonly maxWidth = FRAME_MAX_WIDTH;
  public readonly presets = [375, 599, 600, 1023, 1024, 1439, 1440, 1920];

  private readonly _destroy$ = new Subject<void>();
  private readonly _frameResized$ = new Subject<void>();
  private _frameObserver: ResizeObserver;
  private _headObserver: MutationObserver;
  private _frameHeight = 0;

  constructor(
    private _registry: DemoRegistryService,
    private _zone: NgZone,
    private _cdr: ChangeDetectorRef,
  ) {}

  public get activeRange(): string {
    const width = this.viewport ? this.frameWidth : window.innerWidth;

    return this.ranges.find((range) => width <= range.max)?.name ?? '';
  }

  public ngAfterViewInit(): void {
    this.frameWidth = this.width;
    this.ranges = this._readRanges();

    if (this.viewport) {
      this._mountFrame();
    }

    merge(this._registry.changes$, this._frameResized$)
      .pipe(debounceTime(80), takeUntil(this._destroy$))
      .subscribe(() => this._zone.run(() => this._rebuild()));

    this._zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(150), takeUntil(this._destroy$))
        .subscribe(() => this._zone.run(() => this._rebuild()));
    });

    // The registry filled up during content init; read the settled DOM on the next tick.
    setTimeout(() => this._rebuild());
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
    this._frameObserver?.disconnect();
    this._headObserver?.disconnect();
  }

  public highlight(target: DemoTarget, on: boolean): void {
    target.directive.highlight(on);
  }

  public copy(target: DemoTarget): void {
    const attrs = target.attrs.map((attr) => `${attr.name}="${attr.value}"`);
    const markup = [`<${target.tag}`, target.classes ? `class="${target.classes}"` : '', ...attrs]
      .filter(Boolean)
      .join(' ');

    navigator.clipboard?.writeText(`${markup}>`);
  }

  public setWidth(width: number | string): void {
    this.frameWidth = Math.min(Math.max(Number(width), FRAME_MIN_WIDTH), FRAME_MAX_WIDTH);
  }

  private _rebuild(): void {
    this.targets = this._registry.items.map((directive) => this._describe(directive));
    this._cdr.markForCheck();
  }

  private _describe(directive: FsInspectDirective): DemoTarget {
    const element = directive.element;

    return {
      directive,
      tag: element.tagName.toLowerCase(),
      label: directive.label,
      classes: (element.getAttribute('class') || '')
        .split(/\s+/)
        .filter((token) => token && !IGNORED_CLASS.test(token))
        .join(' '),
      attrs: Array.from(element.attributes)
        .filter((attribute) => !IGNORED_ATTRIBUTE.test(attribute.name))
        .map((attribute) => ({ name: attribute.name, value: attribute.value })),
    };
  }

  private _readRanges(): BreakpointRange[] {
    const tokens = new Map(
      readTokens(document, '--fs-token-break-').map(({ name, value }) => [name, parseInt(value, 10)]),
    );

    const xsmall = tokens.get('--fs-token-break-xsmall') ?? 599;
    const small = tokens.get('--fs-token-break-small') ?? 1023;
    const medium = tokens.get('--fs-token-break-medium') ?? 1439;
    const large = tokens.get('--fs-token-break-large') ?? 1919;

    return [
      { name: 'xs', label: `≤ ${xsmall}`, max: xsmall },
      { name: 'sm', label: `${xsmall + 1} – ${small}`, max: small },
      { name: 'md', label: `${small + 1} – ${medium}`, max: medium },
      { name: 'lg', label: `${medium + 1} – ${large}`, max: large },
      { name: 'xl', label: `≥ ${large + 1}`, max: Infinity },
    ];
  }

  /**
   * Moves the stage into an iframe so the breakpoint attributes respond to the frame's width. It
   * is the only way to show `fs.lt-sm` switching over without asking the reader to resize their
   * browser window.
   */
  private _mountFrame(): void {
    const iframe = this._frame?.nativeElement;
    const doc = iframe?.contentDocument;

    if (!doc) {
      return;
    }

    doc.open();
    doc.write('<!doctype html><html><head></head><body></body></html>');
    doc.close();

    doc.body.style.margin = '0';
    doc.body.style.padding = '16px';

    this._copyStyles(doc);
    doc.body.appendChild(this._content.nativeElement);

    this._observeHead(doc);
    this._observeFrame(iframe, doc);
  }

  private _copyStyles(doc: Document): void {
    document.head
      .querySelectorAll('style, link[rel="stylesheet"]')
      .forEach((node) => doc.head.appendChild(node.cloneNode(true)));
  }

  /** Keeps the frame in sync when the dev server swaps a stylesheet in. */
  private _observeHead(doc: Document): void {
    this._zone.runOutsideAngular(() => {
      this._headObserver = new MutationObserver((mutations) => {
        const added = mutations.flatMap((mutation) => Array.from(mutation.addedNodes));
        const styles = added.filter((node): node is HTMLElement =>
          node instanceof HTMLStyleElement || node instanceof HTMLLinkElement);

        styles.forEach((node) => doc.head.appendChild(node.cloneNode(true)));
      });

      this._headObserver.observe(document.head, { childList: true });
    });
  }

  private _observeFrame(iframe: HTMLIFrameElement, doc: Document): void {
    this._zone.runOutsideAngular(() => {
      const sync = () => {
        const height = Math.max(doc.body.scrollHeight, 48);

        if (height !== this._frameHeight) {
          this._frameHeight = height;
          iframe.style.height = `${height}px`;
        }
      };

      this._frameObserver = new ResizeObserver(() => {
        sync();
        this._frameResized$.next();
      });

      this._frameObserver.observe(doc.body);
      sync();
    });
  }
}
