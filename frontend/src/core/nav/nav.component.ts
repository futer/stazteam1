import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService as SocialMediaAuthService } from 'angularx-social-login';
import * as fromAuth from '../store/auth/auth.reducers';
import { BookmarkState } from '../store/bookmark/bookmark.state';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
   @Input() bookmark$: Observable<any>;
   name$: Observable<any> = this.store.select(fromAuth.User);
   pic$ = this.store.select(fromAuth.User);
   currentSub: Subscription;

    constructor(
        private store: Store<BookmarkState>,
        private router: Router,
        private socialMediaAuthService: SocialMediaAuthService,
    ) {}

    ngOnInit() {
      this.store.dispatch(new bookmarkActions.FetchBookmark());
    }

    logOut() {
        this.store.dispatch(new AuthActions.Logout());
        this.store.dispatch(new AuthActions.ClearStore());
        this.socialMediaAuthService.signOut();
    }

    navigateToSubpage(title: string) {
        this.router.navigate(['/subpage', title]);
    }

    navigateToProfileEditor() {
        this.router.navigate(['/user-editor']);
    }

}

