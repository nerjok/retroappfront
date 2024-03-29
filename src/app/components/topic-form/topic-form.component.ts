import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbDate, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { Topic, TopicsService } from 'src/app/services/topics.service';
import { TopicStatus, topicStatus } from 'src/app/shared/models/topic-status.enum';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {

  topicStatuses = topicStatus;
  topicsFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    comment: FormControl<string | null>;
    id: FormControl<string | null>;
    dueDate: FormControl<NgbDateStruct | null>;
    status: FormControl<TopicStatus | null>
  }>;
  @Input() topic?: Topic | undefined;

  @Output() topicUpdated = new EventEmitter();

  constructor(private topicsService: TopicsService, private router: Router) {}
  ngOnInit(): void {
    let dueDate: NgbDateStruct | null = null;
    if (this.topic?.dueDate) {
      const date = new Date(Date.parse(this.topic.dueDate));
      dueDate = {
        day: date.getDate(),
        month: date.getMonth() + 1,
        year: date.getFullYear(),
      };
    }
    this.topicsFormGroup = new FormGroup({
      name: new FormControl<string>(this.topic?.name || '', [
        Validators.required,
      ]),
      comment: new FormControl<string | null>(this.topic?.comment || null, {
        validators: [Validators.required],
      }),
      id: new FormControl<string | null>(this.topic?.id ?? null),
      dueDate: new FormControl<NgbDateStruct | null>(dueDate, [
        Validators.required,
      ]),
      status: new FormControl<TopicStatus | null>(this.topic?.status ?? TopicStatus.New, [
        Validators.required,
      ]),
    });
  }

  saveTopic() {
    if (this.topicsFormGroup.invalid) {
      this.topicsFormGroup.markAllAsTouched();
      return;
    }
    const formValues = this.topicsFormGroup.value;
    const formDueDate: NgbDateStruct =
      this.topicsFormGroup.controls.dueDate.value!;
    const dueDateString = new Date(
      formDueDate.year,
      formDueDate.month - 1,
      formDueDate.day
    );

    const topic: Topic = {
      ...this.topicsFormGroup.value,
      dueDate: dueDateString.toISOString()
    } as Topic;
    // return;
    this.topicsService.createTopic(topic).subscribe((response) => {
      if (this.topic) {
        this.topicUpdated.emit(response);
      } else {
        this.router.navigateByUrl('/');
      }
    });
  }
}
