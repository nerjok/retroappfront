import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Topic, TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-form',
  templateUrl: './topic-form.component.html',
  styleUrls: ['./topic-form.component.scss'],
})
export class TopicFormComponent implements OnInit {
  topicsFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    comment: FormControl<string | null>;
    id: FormControl<string | null>;
  }>;
  readonly topic?: Topic | undefined;

  constructor(
    private topicsService: TopicsService,
    private router: Router,
  ) {
    console.log(router.getCurrentNavigation()?.extras);
    if (router.getCurrentNavigation()?.extras) {
      this.topic = router.getCurrentNavigation()?.extras.state as Topic;
    }
  }
  ngOnInit(): void {
    console.log(
      '[[ initForm ]]',
      this.topic,
      this.router.getCurrentNavigation()?.extras
    );

    this.topicsFormGroup = new FormGroup({
      name: new FormControl<string>(this.topic?.name || '', [
        Validators.required,
      ]),
      comment: new FormControl<string| null>(this.topic?.comment || null, {
        validators: [Validators.required],
      }),
      id: new FormControl<string | null>(this.topic?.id ?? null),
    });
  }
  saveTopic() {
    if (this.topicsFormGroup.invalid) {
      this.topicsFormGroup.markAllAsTouched();
      return;
    }
    console.log(this.topicsFormGroup.value, this.topicsFormGroup.invalid);
    const topic: Topic = this.topicsFormGroup.value as Topic;
    this.topicsService.createTopic(topic).subscribe((response) => {
      console.log(response);
      this.router.navigateByUrl('/');
    });
  }
}
