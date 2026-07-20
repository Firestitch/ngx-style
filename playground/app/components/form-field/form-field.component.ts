import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatError, MatHint, MatLabel, MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

import { FsDemoComponent, FsInspectDirective } from '../../demo';


@Component({
  selector: 'form-field',
  templateUrl: 'form-field.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField, MatLabel, MatInput, MatHint, MatError,
    FsDemoComponent, FsInspectDirective,
  ],
})
export class FormFieldComponent {

  public readonly appearances: ('fill' | 'outline')[] = ['fill', 'outline'];

  public readonly invalid = new FormControl('', Validators.required);

  constructor() {
    this.invalid.markAsTouched();
  }
}
