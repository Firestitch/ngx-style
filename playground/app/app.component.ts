import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { MatSlideToggle } from '@angular/material/slide-toggle';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  imports: [RouterOutlet, MatSlideToggle],
})
export class AppComponent {
}
