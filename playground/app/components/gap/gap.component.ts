import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsDemoComponent, FsVariantComponent } from '../../demo';


@Component({
  selector: 'app-gap',
  templateUrl: './gap.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FsDemoComponent, FsVariantComponent],
})
export class GapComponent {

  public readonly sizes = [
    { name: 'none', value: '0px' },
    { name: 'xs', value: '5px' },
    { name: 'sm', value: '10px' },
    { name: 'md', value: '20px' },
    { name: 'lg', value: '40px' },
  ];

  public readonly items = [1, 2, 3, 4, 5, 6, 7, 8];
}
