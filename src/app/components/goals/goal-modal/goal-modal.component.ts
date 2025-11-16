import { Component, inject, OnInit, signal } from '@angular/core';
import { ModalBaseComponent } from 'src/app/shared/components/modal/modal-base/modal-base.component';
import { GoalFormComponent } from '../goal-form/goal-form.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Goal } from 'src/app/services/goals.service';
import { MODAL_DATA } from 'src/app/shared/components/modal/modal.model';

export interface EditGoal {
  goal: Goal;
}
@Component({
  selector: 'app-goal-modal',
  imports: [ModalBaseComponent, GoalFormComponent],
  templateUrl: './goal-modal.component.html',
  styleUrl: './goal-modal.component.scss',
})
export class GoalModalComponent implements OnInit{
  activeModal = inject(NgbActiveModal);
  goal = signal<Goal | null>(null);

  modalData = inject<EditGoal>(MODAL_DATA);

  ngOnInit(): void {
    this.goal.set(this.modalData?.goal || null);
  }
  onGoalUpdate() {
    console.log('[[ modalClose ]]');
    
    this.activeModal.close();
  }
}
