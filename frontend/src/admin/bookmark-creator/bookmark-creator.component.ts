import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as fromStore from '../../core/store/index';

@Component({
  selector: 'app-bookmark-creator',
  templateUrl: './bookmark-creator.component.html',
  styleUrls: ['./bookmark-creator.component.scss']
})
export class BookmarkCreatorComponent implements OnInit {


  constructor(
    private store: Store<CoreState>,
  ) { }

  ngOnInit() {
    this.bookmark$ = this.store.select(fromStore.getBookmarksSubpage);
  }



}
