import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FsLabelModule } from '@firestitch/label';

@Component({
    selector: 'app-responsive',
    templateUrl: './responsive.component.html',
    styleUrls: ['./responsive.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
    imports: [FsLabelModule],
})
export class ResponsiveComponent {

  public gap = 'xs';
  public align = 'start';
  public justify = '';
  public size = 'lt-xs';
}
