import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CommentService } from 'src/app/services/comments.service';
import { TopicComment } from 'src/app/services/topics.service';

@Component({
  selector: 'app-create-comment',
  templateUrl: './create-comment.component.html',
  styleUrls: ['./create-comment.component.scss'],
})
export class CreateCommentComponent {
  @Input() topicId!: string;
  @Input() commentId?: string | null;
  @Input() comment?: TopicComment;

  @Output() commentAdded = new EventEmitter<TopicComment>();

  commentsFormGroup!: FormGroup<{
    name: FormControl<string | null>;
    text: FormControl<string | null>;
  }>;

  constructor(
    private commentService: CommentService,
    private router: Router,
    private readonly route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.commentsFormGroup = new FormGroup({
      name: new FormControl<string>(this.comment?.name ?? '', [
        Validators.required,
      ]),
      text: new FormControl<string>(this.comment?.text ?? '', {
        validators: [Validators.required],
      }),
    });
  }

  save() {
    if (this.commentsFormGroup.invalid) {
      this.commentsFormGroup.markAllAsTouched();
      return;
    }

    const comment = this.commentsFormGroup.value as TopicComment;
    const topicId = this.topicId ?? this.comment?.topicId;
    this.commentService
      .createComment({
        ...(this.comment ? this.comment : {}),
        ...comment,
        topicId,
      })
      .subscribe((data) => {
        this.commentsFormGroup.reset();
        if (this.comment) {
          this.router.navigate(['..'], { relativeTo: this.route });
          this.commentAdded.emit(this.comment);
        } else {
          const currentUrl = this.router.url;
          // this.router.navigate([currentUrl]);
            this.router.navigateByUrl('/', {skipLocationChange: true}).then(() => {
              this.router.navigate([currentUrl]);
          });
        }
      });
  }
}
