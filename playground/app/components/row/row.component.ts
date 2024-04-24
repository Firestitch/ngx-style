import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-row',
  templateUrl: './row.component.html',
  styleUrls: ['./row.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RowComponent {

  public gap = 'xs';
  public align = 'start';
  public justify = '';
  public size = 'lt-xs';
}
