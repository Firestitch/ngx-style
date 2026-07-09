import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatSlideToggle } from '@angular/material/slide-toggle';

import { FsDemoComponent } from '../../demo';


@Component({
  selector: 'app-buttons',
  templateUrl: './buttons.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatButton, MatSlideToggle, FsDemoComponent],
})
export class ButtonsComponent {
}
