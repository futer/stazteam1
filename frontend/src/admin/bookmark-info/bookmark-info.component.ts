import {
  Component,
  OnInit,
  Input
} from '@angular/core';
import { FormGroup, FormBuilder} from '@angular/forms';
import { Store } from '@ngrx/store';
import * as bookmarkActions from 'src/core/store/bookmark/bookmark.actions';
import { BookmarkState } from 'src/core/store/bookmark/bookmark.state';

@Component({
  selector: 'app-bookmark-info',
  templateUrl: './bookmark-info.component.html',
  styleUrls: ['./bookmark-info.component.scss']
})
export class BookmarkInfoComponent implements OnInit {

  @Input() data;
  private isShown = false;
  private bookmarkEditForm: FormGroup;

  constructor( private editFormBuilder: FormBuilder,
    private store: Store<BookmarkState>) { }

  ngOnInit() {
  }

  toggleForm(data) {
    this.store.dispatch(new bookmarkActions.SetCurrentBookmark(data));
    this.isShown = !this.isShown;
   }

   deleteBookmark(event) {
    if ( window.confirm('Are sure you want to delete this bookmark ?')) {
      this.store.dispatch(new bookmarkActions.Delete(event.id));
     }
   }
}
