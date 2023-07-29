import { DebugElement } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { MODAL_DATA } from '../modal.model';

import { ModalBaseComponent } from './modal-base.component';

describe('ModalBaseComponent', () => {
  let component: ModalBaseComponent;
  let fixture: ComponentFixture<ModalBaseComponent>;
  let spy: any;

  beforeEach(async () => {
    spy = jasmine.createSpyObj('NgbActiveModal', { dismiss: () => {}, close: () => {} });

    await TestBed.configureTestingModule({
      declarations: [ModalBaseComponent],
      providers: [
        { provide: NgbActiveModal, useValue: spy },
        { provide: MODAL_DATA, useValue: {} },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ModalBaseComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should test clickable close button', () => {
    const testButton: DebugElement = fixture.debugElement.query(By.css('#ok-button')); // returns null

    testButton.triggerEventHandler('click');
    expect(spy.close).toHaveBeenCalledTimes(1);
  });

  it('should test clickable dismiss button', () => {
    const testButton: DebugElement = fixture.debugElement.query(By.css('#dismiss-button')); // returns null

    testButton.triggerEventHandler('click');
    expect(spy.dismiss).toHaveBeenCalledTimes(1);
  });
});
