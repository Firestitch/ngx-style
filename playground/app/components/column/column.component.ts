import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsLabelModule } from '@firestitch/label';

@Component({
    selector: 'app-column',
    templateUrl: './column.component.html',
    styleUrls: ['./column.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsLabelModule],
})
export class ColumnComponent {

  public gap = 'small';
  public align = 'start';
}
