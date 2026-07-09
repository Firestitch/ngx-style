import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsDemoComponent, FsInspectDirective, FsVariantComponent } from '../../demo';


@Component({
  selector: 'app-column',
  templateUrl: './column.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FsDemoComponent, FsInspectDirective, FsVariantComponent],
})
export class ColumnComponent {

  public readonly gaps = ['none', 'xs', 'sm', 'md', 'lg'];
  public readonly aligns = ['start', 'center', 'end', 'baseline', 'normal'];
  public readonly justifies = ['start', 'center', 'end', 'around', 'between', 'evenly'];
}
