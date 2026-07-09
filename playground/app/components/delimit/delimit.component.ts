import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsDemoComponent, FsInspectDirective } from '../../demo';


@Component({
  selector: 'app-delimit',
  templateUrl: './delimit.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FsDemoComponent, FsInspectDirective],
})
export class DelimitComponent {

  public readonly items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
  ];
}
