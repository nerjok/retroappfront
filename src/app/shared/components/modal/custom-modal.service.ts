import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { ModalCloseType } from './modal.model';

@Injectable({ providedIn: 'root' })
export class CustomModalService {
  modalResponse$ = new Subject();
  public close<T>(result?: T): void {
    this.modalResponse$.next({
      modalCloseType: ModalCloseType.CLOSE,
      result,
    });
  }

  public dismiss<T>(dismissReason?: string): void {
    this.modalResponse$.next({
      modalCloseType: ModalCloseType.DISMISS,
      result: dismissReason,
    });
  }
}
