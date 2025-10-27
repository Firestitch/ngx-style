import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatFormField } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
import { FsLabelModule } from '@firestitch/label';

@Component({
    selector: 'helpers',
    templateUrl: 'helpers.component.html',
    styleUrls: ['helpers.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [
        MatFormField,
        MatInput,
        FsLabelModule,
    ],
})
export class HelpersComponent {

}
