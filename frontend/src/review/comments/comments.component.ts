import { Component, Input } from '@angular/core';

import { CommentModel } from '../../app/models/comment.model';

import { ReviewService } from '../services/review.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent {
  // test
  @Input() comments: CommentModel[];
  @Input() commentsStyle: string;

  constructor(
    private reviewService: ReviewService,
  ) {
    this.comments = [];
    this.commentsStyle = '';
  }

  onClick(comment: CommentModel) {
    this.reviewService.deleteCommentMutation(comment.id)
      .toPromise()
      .then(() => {
        const idx = this.comments.findIndex(cmt => cmt.id === comment.id);

        if (idx >= 0) {
          this.comments.splice(idx, 1);
        }
      });
  }
}
