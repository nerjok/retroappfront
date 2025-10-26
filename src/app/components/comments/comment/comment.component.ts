import { CommonModule } from '@angular/common';
import { Component, EventEmitter, input, Output, signal } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faEdit } from '@fortawesome/free-solid-svg-icons';
import { Topic, TopicComment } from 'src/app/services/topics.service';
import { CreateCommentComponent } from '../create-comment/create-comment.component';

@Component({
    selector: 'app-comment',
    imports: [CommonModule, FontAwesomeModule, CreateCommentComponent],
    templateUrl: './comment.component.html',
    styleUrl: './comment.component.scss',
    standalone: true
})
export class CommentComponent {
  faEdit = faEdit;

  editComment = signal(false);

  comment = input<TopicComment>();
  topic = input<Topic>();

  @Output() commentAdded = new EventEmitter<TopicComment>();
  

  onEditComment(): void {
    console.log('Edit comment', this.comment());
     this.editComment.set(true);
  }

  onCommentAdded():void {
    this.editComment.set(false);
    this.commentAdded.emit();
  }
}
