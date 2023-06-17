import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { Topic, TopicsService } from 'src/app/services/topics.service';

@Component({
  selector: 'app-topics',
  templateUrl: './topics.component.html',
  styleUrls: ['./topics.component.scss']
})
export class TopicsComponent implements OnInit{
  topics$?: Observable<Topic[]>
  constructor(private topicsService: TopicsService, private router: Router) {}
  ngOnInit(): void {
    this.topics$ = this.topicsService.topics();
  }

  addTopic(): void {
    this.router.navigate(['create']);
  }

  editTopic(topic: Topic):void {
    this.router.navigate(['edit'], { state: topic});
  }

  viewTopic(topic: Topic):void {
    this.router.navigate(['view'], { state: topic});
  }
}
