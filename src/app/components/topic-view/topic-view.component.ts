import { Component } from '@angular/core';
import { Router } from '@angular/router';
import {
  TopicsService,
  Topic,
  TopicComment,
} from 'src/app/services/topics.service';

@Component({
  selector: 'app-topic-view',
  templateUrl: './topic-view.component.html',
  styleUrls: ['./topic-view.component.scss'],
})
export class TopicViewComponent {
  readonly topic?: Topic | undefined;

  get comments(): TopicComment[] | undefined {
    return this.topic?.comments;
  }
  constructor(private topicsService: TopicsService, private router: Router) {
    console.log(router.getCurrentNavigation()?.extras);
    if (router.getCurrentNavigation()?.extras) {
      this.topic = router.getCurrentNavigation()?.extras.state as Topic;
    }
  }

  editComment(comment: TopicComment): void {
    this.router.navigate(['edit-comment', { id: comment.id }], {
      state: comment,
    });
  }
}
