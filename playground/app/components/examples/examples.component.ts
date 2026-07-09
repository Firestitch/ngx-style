import { Component } from '@angular/core';

import { environment } from '@env';
import { FsExampleModule } from '@firestitch/example';

import { BreakpointsComponent } from '../breakpoints/breakpoints.component';
import { ButtonsComponent } from '../buttons/buttons.component';
import { ColumnComponent } from '../column/column.component';
import { DelimitComponent } from '../delimit/delimit.component';
import { FormFieldComponent } from '../form-field/form-field.component';
import { GapComponent } from '../gap/gap.component';
import { HeadingsComponent } from '../headings/headings.component';
import { HelpersComponent } from '../helpers/helpers.component';
import { ResponsiveComponent } from '../responsive/responsive.component';
import { RowComponent } from '../row/row.component';
import { TokensComponent } from '../tokens/tokens.component';
import { TypographyComponent } from '../typography/typography.component';


@Component({
  templateUrl: 'examples.component.html',
  standalone: true,
  imports: [
    FsExampleModule,
    BreakpointsComponent,
    ButtonsComponent,
    ColumnComponent,
    DelimitComponent,
    FormFieldComponent,
    GapComponent,
    HeadingsComponent,
    HelpersComponent,
    ResponsiveComponent,
    RowComponent,
    TokensComponent,
    TypographyComponent,
  ],
})
export class ExamplesComponent {
  public config = environment;
}
