import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic, TopicsService } from 'src/app/services/topics.service';

@Component({
    selector: 'app-edit-topic',
    templateUrl: './edit-topic.component.html',
    styleUrls: ['./edit-topic.component.scss'],
    standalone: false
})
export class EditTopicComponent implements OnInit{

  topic$!: Observable<Topic>;
  @Input() set id(id: string) {
    this.topic$ = this.topicsService.getTopic(id);
  }
  constructor(private topicsService: TopicsService) {
  }
  ngOnInit(): void {
    // this.router.getCurrentNavigation.
    // this.ac.
  }
}
