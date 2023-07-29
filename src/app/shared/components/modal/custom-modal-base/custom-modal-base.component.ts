import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, Output } from '@angular/core';
import { CustomModalService } from '../custom-modal.service';
import { ModalType } from '../modal.model';
@Component({
  selector: 'lib-green-modal-base',
  templateUrl: './custom-modal-base.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CustomModalBaseComponent {
  @Input() modalType: ModalType = 'default';
  @Input() public header?: string;
  @Input() public confirmLabel?: string;
  @Input() public dismissLabel?: string;
  @Input() crossClose?: () => void;

  @Output() closeModal = new EventEmitter<unknown>();
  @Output() confirm = new EventEmitter<unknown>();

  isOpen = true;

  constructor(private customModalService: CustomModalService, private changeDetectorRef: ChangeDetectorRef) {}

  public close(): void {
    if (this.crossClose) {
      this.crossClose();
    } else {
      this.isOpen = false;
      setTimeout(() => {
        this.customModalService.dismiss();
      }, 300);
    }
  }

  public setClosed(): void {
    this.isOpen = false;
    this.changeDetectorRef.detectChanges();
  }
}
