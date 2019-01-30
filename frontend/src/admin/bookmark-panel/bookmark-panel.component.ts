import { Component, OnInit } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';
import { Observable, Subscribable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as fromStore from '../../core/store/index';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { Subscription } from 'rxjs';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-bookmark-panel',
  templateUrl: './bookmark-panel.component.html',
  styleUrls: ['./bookmark-panel.component.scss']
})
export class BookmarkPanelComponent implements OnInit {

  bookmark$: Observable<any> = this.store.select(fromStore.getBookmarksSubpage);
  isShown = false;
  addBookmarkForm: FormGroup;
  positions =  {'right': 'RIGHT',  'top': 'TOP'};

  constructor(private store: Store<CoreState>,
    private formBuilder: FormBuilder
     ) { }

  ngOnInit() {
    this.addBookmarkForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      content: ['', Validators.required],
      position: ['', Validators.required]
    });
  }

  log() {
    console.log(this.addBookmarkForm.value);
  }

}
