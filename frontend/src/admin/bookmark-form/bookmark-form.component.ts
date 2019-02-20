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
import { TranslateService } from '@ngx-translate/core';
import ita_adminModuleTranslation from '../../shared/translations/ita_adminModuleTranslation.json';
import fr_adminModuleTranslation from '../../shared/translations/fr_adminModuleTranslation.json';


@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})

export class BookmarkFormComponent implements OnInit {
  @Input() data;
  private bookmarkEditForm: FormGroup;
  private positions =  {
    'right': 'RIGHT',
    'top': 'TOP'
  };

  constructor (
    private editFormBuilder: FormBuilder,
    private translate: TranslateService,
    private store: Store<BookmarkState>
    ) {
      this.translate.setTranslation('ita', ita_adminModuleTranslation);
      this.translate.setTranslation('fr', fr_adminModuleTranslation);
    }

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
