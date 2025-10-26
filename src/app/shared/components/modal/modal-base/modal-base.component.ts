import { ChangeDetectionStrategy, Component, ContentChild, Input, TemplateRef } from '@angular/core';
import { ModalBase } from '../modal-base';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'lib-modal-base',
    templateUrl: './modal-base.component.html',
    changeDetection: ChangeDetectionStrategy.OnPush,
    imports: [CommonModule],
    styleUrls: ['./modal-base.component.scss'],
    standalone: true
})
export class ModalBaseComponent extends ModalBase {
  @ContentChild('modalFooter') modalFooter: TemplateRef<unknown> | undefined;
  @ContentChild('modalHeader') modalHeader: TemplateRef<unknown> | undefined;
  @Input() title: string | undefined;
}
