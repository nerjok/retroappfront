import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicComment } from 'src/app/services/topics.service';

@Component({
    selector: 'app-edit-comment',
    templateUrl: './edit-comment.component.html',
    styleUrls: ['./edit-comment.component.scss'],
    standalone: false
})
export class EditCommentComponent {
  commentId: string | null = this.route.snapshot.paramMap.get('id');
  topicComment: TopicComment| undefined
  constructor(private route: ActivatedRoute, private router: Router) {
    if (router.getCurrentNavigation()?.extras) {
      this.topicComment = router.getCurrentNavigation()?.extras.state as TopicComment;
    }
  }

  ngOnInit() {
    const heroId = this.route.snapshot.paramMap.get('id');
  }
}
