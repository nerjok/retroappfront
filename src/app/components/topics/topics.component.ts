import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { faEdit, faEye } from '@fortawesome/free-solid-svg-icons';
import { Observable } from 'rxjs';
import { Pager, Topic, TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit{
  topics$?: Observable<Pager<Topic>>

  faEdit = faEdit;
  faEye = faEye;
  constructor(private topicsService: TopicsService, private router: Router) {}

  ngOnInit(): void {
    this.topics$ = this.topicsService.topics();
  }

  addTopic(): void {
    this.router.navigate(['create']);
  }

  editTopic(topic: Topic):void {
    this.router.navigate(['edit', topic.id], { state: topic});
  }

  viewTopic(topic: Topic):void {
    this.router.navigate(['view', topic.id], { state: topic});
  }
}
