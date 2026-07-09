import { Directive, ElementRef, Input, NgZone, OnDestroy, OnInit, Optional } from '@angular/core';

import { DemoRegistryService } from './demo-registry.service';


/**
 * Marks an element as worth explaining. The surrounding `<fs-demo>` reads its classes and
 * attributes straight off this DOM node, so the chip can never disagree with what is rendered.
 */
@Directive({
  selector: '[fsInspect]',
  standalone: true,
})
export class FsInspectDirective implements OnInit, OnDestroy {

  @Input('fsInspect')
  public label = '';

  private _observer: MutationObserver;
  private _outline = '';
  private _outlineOffset = '';

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _zone: NgZone,
    @Optional() private _registry: DemoRegistryService,
  ) {}

  public get element(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  public ngOnInit(): void {
    this._registry?.register(this);

    this._zone.runOutsideAngular(() => {
      this._observer = new MutationObserver((mutations) => {
        // `highlight()` writes inline styles. Reacting to that would loop.
        if (mutations.every((mutation) => mutation.attributeName === 'style')) {
          return;
        }

        this._registry?.touch();
      });

      this._observer.observe(this.element, { attributes: true });
    });
  }

  public ngOnDestroy(): void {
    this._observer?.disconnect();
    this._registry?.unregister(this);
  }

  /** Inline styles rather than a class, so highlighting never pollutes what the panel reports. */
  public highlight(on: boolean): void {
    const element = this.element;

    if (on) {
      this._outline = element.style.outline;
      this._outlineOffset = element.style.outlineOffset;
      element.style.outline = '2px solid #ea4266';
      element.style.outlineOffset = '2px';
    } else {
      element.style.outline = this._outline;
      element.style.outlineOffset = this._outlineOffset;
    }
  }
}
