import { Component, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from 'src/app/shared/components/modal/modal.model';

@Component({
  selector: 'app-edit-modal',
  templateUrl: './edit-modal.component.html',
  styleUrls: ['./edit-modal.component.scss']
})
export class EditModalComponent {

  get topic() {
    return this.modalData;
  }
  constructor(public activeModal: NgbActiveModal,@Inject(MODAL_DATA) public modalData: any) {}

  onUpdate() {
    this.activeModal.close();
  }
}
