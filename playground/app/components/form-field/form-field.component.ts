import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatHint, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsDemoComponent, FsInspectDirective } from '../../demo';


@Component({
  selector: 'form-field',
  templateUrl: 'form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [MatFormField, MatLabel, MatInput, MatHint, FsDemoComponent, FsInspectDirective],
})
export class FormFieldComponent {

  public readonly appearances: ('fill' | 'outline')[] = ['fill', 'outline'];
}
