import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';
import { Observable, Subscribable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as fromStore from '../../core/store/index';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-bookmark-panel',
  templateUrl: './bookmark-panel.component.html',
  styleUrls: ['./bookmark-panel.component.scss']
})
export class BookmarkPanelComponent implements OnInit {

  bookmark$: Observable<any>;
  isShown = false;

  constructor(private store: Store<CoreState>,
     ) { }

  ngOnInit() {
    this.bookmark$ = this.store.select(fromStore.getBookmarksSubpage);
  }

  // toggleForm(data) {
  //   this.store.dispatch(new bookmarkActions.SetCurrentBookmark(data));
  //   this.isShown = !this.isShown;
  //   console.log(this.isShown);
  //  }

}
