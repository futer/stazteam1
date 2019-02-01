import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubpageService } from 'src/shared/services/subpage.service';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as bookmarkActions from 'src/core/store/bookmark/bookmark.actions';


@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent implements OnInit {
  @Input() data;
  bookmarkEditForm: FormGroup;
  positions =  {'right': 'RIGHT',  'top': 'TOP'};

  constructor( private editFormBuilder: FormBuilder,
    private subpageService: SubpageService,
    private store: Store<CoreState> ) { }

  ngOnInit() {
    this.bookmarkEditForm = this.editFormBuilder.group({
      title: [this.data.title, Validators.required],
      position: [this.data.position, Validators.required],
      content: [this.data.content, Validators.required],
      id: [this.data.id]
    });
  }

  updateBookmark(event) {
    if ( window.confirm('Are sure you want to save changes ?')) {
      this.store.dispatch(new bookmarkActions.Update(event.value));
     }
  }

}
