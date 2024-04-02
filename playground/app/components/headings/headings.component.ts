import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'headings',
  templateUrl: './headings.component.html',
  styleUrls: ['./headings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeadingsComponent {

}
