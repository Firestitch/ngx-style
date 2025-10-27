import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
    selector: 'typography',
    templateUrl: 'typography.component.html',
    styleUrls: ['typography.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: true,
})
export class TypographyComponent {

}
