import { InjectionToken } from '@angular/core';
import { NgbModalOptions } from '@ng-bootstrap/ng-bootstrap';

export const MODAL_DATA = new InjectionToken<string>('MODAL_DATA');

export enum ModalCloseType {
  DISMISS,
  CLOSE,
}

export interface ModalCloseReason<T> {
  modalCloseType: ModalCloseType;
  result?: T;
}

export interface ModalOptions<T> extends NgbModalOptions {
  data?: T;
}


export type ModalType = 'default'; 