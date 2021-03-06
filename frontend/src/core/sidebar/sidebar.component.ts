import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthState } from '../store/auth/auth.state';
import { Subscription } from 'rxjs';
import { RoleEnum } from 'src/app/models/role.enum';
import { User } from '../store/auth/auth.reducers';
import { UserModel } from 'src/app/models/user.model';
import { BookmarkState } from '../store/bookmark/bookmark.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit, OnDestroy {
  @Input() bookmark$: Observable<any>;

  private rolesub: Subscription;
  private role$: Observable<UserModel>;
  private role: RoleEnum;

  constructor(
    private store: Store<BookmarkState>,
    private authStore: Store<AuthState>,
    private router: Router
    ) { }

  ngOnInit() {
    this.store.dispatch(new bookmarkActions.FetchBookmark);
    this.role$ = this.authStore.select(User);
  }

  ngOnDestroy() {
    this.rolesub.unsubscribe();
  }

  navigateToSubpage(title) {
    this.router.navigate(['/subpage', title]);
  }

  navigateToFav() {
    this.router.navigate(['/favourites']);
  }

  navigateToAdminUserEditor() {
    this.router.navigate(['/admin']);
  }

  navigateToBookmarkEditor() {
    this.router.navigate(['/bookmark-panel']);
  }

  navigateToReviewerPanel() {
    this.router.navigate(['/review']);
  }
}
