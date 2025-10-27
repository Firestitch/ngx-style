import { Component } from '@angular/core';
import { NgTemplateOutlet } from '@angular/common';
import { MatFormField, MatLabel, MatHint } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';

@Component({
    selector: 'form-field',
    templateUrl: 'form-field.component.html',
    styleUrls: ['form-field.component.scss'],
    standalone: true,
    imports: [NgTemplateOutlet, MatFormField, MatLabel, MatInput, MatHint]
})
export class FormFieldComponent {

}
