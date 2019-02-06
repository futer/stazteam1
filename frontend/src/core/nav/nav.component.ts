import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav/nav.service';
import { AuthService } from '../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';
import { SubpageService } from 'src/shared/services/subpage.service';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import * as AuthActions from '../../core/store/auth/auth.actions';
import * as fromStore from '../../core/store/index';
import { map } from 'rxjs/operators';
import { CoreState } from '../store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import { AuthService as SocialMediaAuthService } from 'angularx-social-login';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
    bookmark$: Observable<any>;

    constructor(
        private authService: AuthService,
        private store: Store<CoreState>,
        private subpageService: SubpageService,
        private router: Router,
        private socialMediaAuthService: SocialMediaAuthService
    ) {}

    ngOnInit() {
        this.bookmark$ = this.store.select(fromStore.getBookmarksSubpage);
        this.store.dispatch(new bookmarkActions.Fetch());
    }

    logOut() {
        this.store.dispatch(new AuthActions.Logout());
        this.socialMediaAuthService.signOut();
    }

    navigateToSubpage(title: string) {
        this.router.navigate(['/subpage', title]);
    }
}
