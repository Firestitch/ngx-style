import { ChangeDetectionStrategy, Component, Input, numberAttribute } from '@angular/core';


/**
 * A labelled swatch for galleries: one class name, rendered live and printed above the render.
 * Both come from the same binding, so the caption can never describe something other than what
 * you are looking at.
 */
@Component({
  selector: 'fs-variant',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  template: `
    <div class="demo-variant">
      <div class="demo-variant__labels">
        @if (label) {
          <span class="demo-variant__caption">{{ label }}</span>
        }
        <code class="demo-variant__label">{{ classes }}</code>
      </div>
      <div
          class="demo-variant__stage"
          [class.demo-variant__stage--fill]="stageHeight"
          [style.height.px]="stageHeight || null">
        <div [class]="classes">
          <ng-content></ng-content>
        </div>
      </div>
    </div>
  `,
})
export class FsVariantComponent {

  @Input() public classes = '';
  @Input() public label = '';

  /** Gives the target a fixed height, so `justify-*` has room to distribute. */
  @Input({ transform: numberAttribute }) public stageHeight = 0;
}
