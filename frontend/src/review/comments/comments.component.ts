import { Component, OnInit, Input } from '@angular/core';
import { CommentModel } from 'src/app/models/comment.model';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit {

  @Input() comments: CommentModel[];

  constructor() { }

  ngOnInit() {
  }

}
