import { AsyncPipe, DatePipe, JsonPipe } from '@angular/common';
import { Component, inject, OnInit, signal } from '@angular/core';
import { Observable } from 'rxjs';
import { Goal, GoalsService, Pager } from 'src/app/services/goals.service';
import { ModalService } from 'src/app/shared/components/modal/modal.service';
import { TopicStatusPipe } from 'src/app/shared/pipes/topic-status.pipe';
import { EditGoal, GoalModalComponent } from './goal-modal/goal-modal.component';
import { SplitterModule } from 'primeng/splitter';
import { Topic, TopicsService } from 'src/app/services/topics.service';
import { GoalFormComponent } from './goal-form/goal-form.component';
import { EditModalComponent } from '../edit-modal/edit-modal.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-goals',
  imports: [AsyncPipe, JsonPipe, DatePipe, TopicStatusPipe, SplitterModule, GoalFormComponent, FontAwesomeModule],
  templateUrl: './goals.component.html',
  styleUrl: './goals.component.scss',
})
export class GoalsComponent implements OnInit {

  faMagnifyingGlass = faMagnifyingGlass;
  faEdit = faEdit;
  

  activeGoal = signal<Goal | null>(null);
  isEditMode = signal<boolean>(false);
  activeGoalTopics$?: Observable<Pager<any>>;
  modalService = inject(ModalService);
  ngOnInit(): void {
    this.fetchGoals();
  }

  goals$?: Observable<Pager<Goal>>

  panelSizes = signal<number[] | null>([99, 1]);

  goalsService = inject(GoalsService);
  topicsService = inject(TopicsService);

  fetchGoals(page = 0): void {
    this.goals$ = this.goalsService.goals(page);
  }

  addGoal(): void {
    // this.router.navigate(['create']);
    this.modalService.show(GoalModalComponent, { modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable', scrollable: true }).subscribe((data) => {
      this.fetchGoals();
    });

  }

  onEditGoal(goal: Goal): void {
    // this.router.navigate(['create']);
    // this.modalService.show<EditGoal>(GoalModalComponent, {
    //   modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable', scrollable: true, data: {
    //     goal: goal,
    //   }
    // }).subscribe((data) => {
    //   this.fetchGoals();
    // });
    this.activeGoal.set(null);
    this.isEditMode.set(false);
    setTimeout(() => {

      this.preview(goal);
      this.isEditMode.set(true);
    }, 0);
  }
  onGoalUpdate(): void {
    this.fetchGoals();
  }

  preview(goal: Goal): void {
    console.log('setActive', goal);
    this.activeGoal.set(null);
    this.isEditMode.set(false);
    this.activeGoal.set(goal);
    this.activeGoalTopics$ = this.getGoalTopics(goal.id!)
    this.panelSizes.set([55, 45]);
  }

  getGoalTopics(goalId: string): Observable<Pager<any>> {
    console.log('[[ goalTopics]]', goalId);

    return this.topicsService.goalTopics(goalId!);
  }

  oncloseClick(): void {
    this.panelSizes.set([99, 1]);
    this.activeGoal.set(null);
    this.isEditMode.set(false);
    this.activeGoalTopics$ = undefined;
  }

  onReviewTopic(topic: Topic): void {
        this.modalService.show(EditModalComponent, { modalDialogClass: 'modal-dialog-slideoutX modal-dialog-scrollable', scrollable: true, data: topic }).subscribe((data) => {
          // this.fetchTopics();
        })
        // this.router.navigate(['edit', topic.id], { state: topic});
  }
}
