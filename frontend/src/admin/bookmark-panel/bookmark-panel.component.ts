import { Component, OnInit } from '@angular/core';
import { Observable} from 'rxjs/observable';
import { Store } from '@ngrx/store';
import * as bookmarkState from '../../core/store/bookmark/bookmark.reducers';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { SubpageService } from 'src/shared/services/subpage.service';
import { BookmarkState } from 'src/core/store/bookmark/bookmark.state';
import { TranslateService } from '@ngx-translate/core';
import ita_adminModuleTranslation from '../../shared/translations/ita_adminModuleTranslation.json';
import fr_adminModuleTranslation from '../../shared/translations/fr_adminModuleTranslation.json';


@Component({
  selector: 'app-bookmark-panel',
  templateUrl: './bookmark-panel.component.html',
  styleUrls: ['./bookmark-panel.component.scss']
})
export class BookmarkPanelComponent implements OnInit {

  private bookmark$: Observable<any> = this.store.select(bookmarkState.getBookmarks);
  private isLoading$: Observable<any> = this.store.select(bookmarkState.getLoading);
  private isLoaded$: Observable<any> = this.store.select(bookmarkState.getLoaded);
  private status$: Observable<any> = this.store.select(bookmarkState.getStatus);
  private isShown = false;
  private addBookmarkForm: FormGroup;
  private positions =  {'right': 'RIGHT',  'top': 'TOP'};
  private showModal = false;
  private position: 'TOP';

  constructor(private store: Store<BookmarkState>,
    private formBuilder: FormBuilder,
    private subpageService: SubpageService,
    private translate: TranslateService,
     ) {
      this.translate.setTranslation('ita', ita_adminModuleTranslation);
      this.translate.setTranslation('fr', fr_adminModuleTranslation);
      }

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
