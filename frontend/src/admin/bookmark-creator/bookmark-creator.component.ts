import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';

@Component({
  selector: 'app-bookmark-creator',
  templateUrl: './bookmark-creator.component.html',
  styleUrls: ['./bookmark-creator.component.scss']
})
export class BookmarkCreatorComponent implements OnInit {

  bookmark: BookmarkModel = {
    title: '',
    position: null,
    content: ''
  };

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log(this.bookmark);
  }

}
