import { Directive, Inject } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from './modal.model';

@Directive()
export abstract class ModalBase<T = unknown> {
  constructor(public activeModal: NgbActiveModal, @Inject(MODAL_DATA) public modalData: T) {}

  public close<T>(result?: T): void {
    this.activeModal.close(result);
  }

  public dismiss<T>(dismissReason?: string): void {
    this.activeModal.dismiss(dismissReason);
  }
}
