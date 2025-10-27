import { Component } from '@angular/core';
import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';
import { HeadingsComponent } from '../headings/headings.component';
import { TypographyComponent } from '../typography/typography.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { HelpersComponent } from '../helpers/helpers.component';
import { RowComponent } from '../row/row.component';
import { ColumnComponent } from '../column/column.component';
import { ResponsiveComponent } from '../responsive/responsive.component';
import { GenericHelpersComponent } from '../generic-helpers/generic-helpers.component';


@Component({
    templateUrl: 'examples.component.html',
    standalone: true,
    imports: [FsExampleModule, HeadingsComponent, TypographyComponent, ButtonsComponent, FormFieldComponent, HelpersComponent, RowComponent, ColumnComponent, ResponsiveComponent, GenericHelpersComponent]
})
export class ExamplesComponent {
  public config = environment;
}
