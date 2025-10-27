import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'app-generic-helpers',
    templateUrl: './generic-helpers.component.html',
    styleUrls: ['./generic-helpers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class GenericHelpersComponent {

  public items = [
    { name: 'Item 1' },
    { name: 'Item 2' },
    { name: 'Item 3' },
    { name: 'Item 4' },
    { name: 'Item 5' },
    { name: 'Item 6' },
  ];

}
