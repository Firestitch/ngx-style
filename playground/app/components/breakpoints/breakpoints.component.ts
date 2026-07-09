import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  NgZone,
  OnDestroy,
  OnInit,
} from '@angular/core';

import { fromEvent, Subject } from 'rxjs';
import { debounceTime, takeUntil } from 'rxjs/operators';

import { readTokens } from '../../demo';


interface BreakpointRow {
  attribute: string;
  when: string;
  active: boolean;
}

const SUFFIX = { xsmall: 'xs', small: 'sm', medium: 'md', large: 'lg' };

@Component({
  selector: 'app-breakpoints',
  templateUrl: './breakpoints.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
})
export class BreakpointsComponent implements OnInit, OnDestroy {

  public rows: BreakpointRow[] = [];
  public width = 0;

  private readonly _destroy$ = new Subject<void>();
  private _breakpoints: { name: string; value: number }[] = [];

  constructor(
    private _zone: NgZone,
    private _cdr: ChangeDetectorRef,
  ) {}

  public ngOnInit(): void {
    // Read the compiled values rather than restating them, so this table cannot go stale.
    this._breakpoints = readTokens(document, '--fs-token-break-')
      .map(({ name, value }) => ({
        name: name.replace('--fs-token-break-', ''),
        value: parseInt(value, 10),
      }));

    this._update();

    this._zone.runOutsideAngular(() => {
      fromEvent(window, 'resize')
        .pipe(debounceTime(100), takeUntil(this._destroy$))
        .subscribe(() => this._zone.run(() => this._update()));
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  private _update(): void {
    const width = window.innerWidth;
    const rows: BreakpointRow[] = [];

    // `lt` includes the breakpoint value itself; `gt` starts one pixel past it.
    this._breakpoints.forEach(({ name, value }) => {
      rows.push({
        attribute: `fs.lt-${SUFFIX[name]}`,
        when: `${value}px wide or narrower`,
        active: width <= value,
      });
    });

    this._breakpoints.forEach(({ name, value }) => {
      rows.push({
        attribute: `fs.gt-${SUFFIX[name]}`,
        when: `${value + 1}px wide or wider`,
        active: width > value,
      });
    });

    this.rows = rows;
    this.width = width;
    this._cdr.markForCheck();
  }
}
