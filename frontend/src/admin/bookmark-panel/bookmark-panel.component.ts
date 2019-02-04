import { Component, OnInit, SimpleChanges, OnChanges } from '@angular/core';
import { BookmarkModel } from '../../app/models/bookmark.model';
import { Observable, Subscribable } from 'rxjs/observable';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as fromStore from '../../core/store/index';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SubpageService } from 'src/shared/services/subpage.service';

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
  showModal = false;
  position: 'TOP';

  constructor(private store: Store<CoreState>,
    private formBuilder: FormBuilder,
    private subpageService: SubpageService
     ) { }

  ngOnInit() {
    this.createForm();
  }

  createForm() {
    this.addBookmarkForm = this.formBuilder.group({
      title: ['', [Validators.required, Validators.maxLength(20)]],
      content: ['', Validators.required],
      position: [this.position],
    });
  }

  addBookmark(event) {
    this.store.dispatch(new bookmarkActions.AddBookmark(event.value));
    this.createForm();
    this.showModal = !this.showModal;
  }

  getValues(e) {
    this.addBookmarkForm.controls['position'].setValue(e);
  }


}
