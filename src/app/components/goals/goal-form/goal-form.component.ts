import { Component, inject, input, OnInit, output } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { NgbDateStruct, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgSelectModule } from '@ng-select/ng-select';
import { Goal, GoalsService } from 'src/app/services/goals.service';
import { SimpleFormGroupComponent } from 'src/app/shared/components/simple-form-group/simple-form-group.component';
import { topicStatus, TopicStatus } from 'src/app/shared/models/topic-status.enum';

@Component({
  selector: 'app-goal-form',
  imports: [ReactiveFormsModule, SimpleFormGroupComponent, NgbModule, NgSelectModule],
  templateUrl: './goal-form.component.html',
  styleUrl: './goal-form.component.scss',
})
export class GoalFormComponent implements OnInit {
  goal = input<Goal>();
  goalService = inject(GoalsService);
  goalUpdated = output<any>();
  topicStatuses = topicStatus;
  goalFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    comment: FormControl<string | null>;
    id: FormControl<string | null>;
    dueDate: FormControl<NgbDateStruct | null>;
    status: FormControl<TopicStatus | null>
  }>;
  ngOnInit(): void {
        let dueDate: NgbDateStruct | null = null;
    if (this.goal() && this.goal()?.dueDate) {
      const date = new Date(Date.parse(this.goal()!.dueDate));
      dueDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    }
    this.goalFormGroup = new FormGroup({
      name: new FormControl<string>(this.goal()?.name || '', [
        Validators.required,
      ]),
      comment: new FormControl<string | null>(this.goal()?.comment || null, {
        validators: [Validators.required],
      }),
      id: new FormControl<string | null>(this.goal()?.id ?? null),
      dueDate: new FormControl<NgbDateStruct | null>(dueDate, [
        Validators.required,
      ]),
      status: new FormControl<TopicStatus | null>(this.goal()?.status ?? TopicStatus.New, [
        Validators.required,
      ]),
    });

    // if(this.goal()){
    //   this.goalFormGroup.disable();
    // }
  }

  editForm() {

  }
    saveGoal() {
      if (this.goalFormGroup.invalid || this.goalFormGroup.disabled) {
        this.goalFormGroup.markAllAsTouched();
        return;
      }
      const formValues = this.goalFormGroup.value;
      const formDueDate: NgbDateStruct =
        this.goalFormGroup.controls.dueDate.value!;
      const dueDateString = new Date(
        formDueDate.year,
        formDueDate.month - 1,
        formDueDate.day
      );
  
      const goal: Goal = {
        ...this.goalFormGroup.value,
        dueDate: dueDateString.toISOString()
      } as Goal;
      // return;
      const endpoint = this.goal() ? this.goalService.updateGoal.bind(this.goalService) : this.goalService.createGoal.bind(this.goalService);
      endpoint(goal).subscribe((response) => {
        if (this.goal()) {
          this.goalFormGroup.disable();
        } else {
          // this.router.navigateByUrl('/');
        }
        this.goalUpdated.emit(response);
      });
    }
}
