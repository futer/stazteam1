import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';
import { Observable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as fromStore from '../../core/store/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { timesSeries } from 'async';

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

  toggleForm() {
    this.isShown = !this.isShown;
    console.log(this.isShown);
   }

}
