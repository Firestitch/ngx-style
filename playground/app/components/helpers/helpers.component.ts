import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsDemoComponent, FsInspectDirective } from '../../demo';


@Component({
  selector: 'helpers',
  templateUrl: 'helpers.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, FsDemoComponent, FsInspectDirective],
})
export class HelpersComponent {

  public readonly paragraph = `Pellentesque maximus magna id gravida posuere. Fusce odio nulla,
    porta ut feugiat ut, posuere non eros. Mauris purus nunc, gravida sed ipsum quis, tincidunt
    rutrum mauris. In a nisl scelerisque, iaculis felis cursus, dictum mi. Curabitur sagittis lorem
    vel euismod efficitur. Etiam aliquet magna diam, at consectetur nisi pharetra sit amet.`;

  public readonly lines = [1, 2, 3, 4, 5, 6];
}
