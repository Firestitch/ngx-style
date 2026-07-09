import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatOption } from '@angular/material/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatSelect } from '@angular/material/select';

import { FsDemoComponent, FsInspectDirective, FsVariantComponent } from '../../demo';


@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    FormsModule,
    MatFormField,
    MatLabel,
    MatOption,
    MatSelect,
    FsDemoComponent,
    FsInspectDirective,
    FsVariantComponent,
  ],
})
export class RowComponent {

  public gap = 'md';
  public align = 'center';
  public justify = '';
  public wrap = false;

  public readonly gaps = ['none', 'xs', 'sm', 'md', 'lg'];
  public readonly aligns = ['start', 'center', 'end', 'baseline', 'normal'];
  public readonly justifies = ['start', 'center', 'end', 'around', 'between', 'evenly'];
  public readonly items = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];

  public get builderClass(): string {
    return [
      'fs-row',
      `.gap-${this.gap}`,
      `.align-${this.align}`,
      this.justify ? `.justify-${this.justify}` : '',
      this.wrap ? '.wrap' : '',
    ].join('');
  }
}
