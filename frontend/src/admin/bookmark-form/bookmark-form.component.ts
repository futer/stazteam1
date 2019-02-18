import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import {
  FormGroup,
  Validators,
  FormBuilder
} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as bookmarkActions from 'src/core/store/bookmark/bookmark.actions';
import { BookmarkState } from 'src/core/store/bookmark/bookmark.state';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})

export class BookmarkFormComponent implements OnInit {
  @Input() data;
  private bookmarkEditForm: FormGroup;
  private positions =  {'right': 'RIGHT',  'top': 'TOP'};

  constructor( private editFormBuilder: FormBuilder,
    private store: Store<BookmarkState> ) { }

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
