import { ChangeDetectionStrategy, Component } from '@angular/core';

import { FsDemoComponent, FsInspectDirective } from '../../demo';


@Component({
  selector: 'typography',
  templateUrl: 'typography.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: true,
  imports: [FsDemoComponent, FsInspectDirective],
})
export class TypographyComponent {
}
