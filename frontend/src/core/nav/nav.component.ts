import { Component, OnInit, Input } from '@angular/core';
import { NavService } from '../services/nav/nav.service';
import { AuthService } from '../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';
import { SubpageService } from 'src/shared/services/subpage.service';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { Router } from '@angular/router';
import { Subscription, Observable } from 'rxjs';
import { AuthService as SocialMediaAuthService } from 'angularx-social-login';
import * as fromAuth from '../store/auth/auth.reducers';
import { BookmarkState } from '../store/bookmark/bookmark.state';
import { from } from 'zen-observable';
import * as pictureUpload from '../../shared/reusable-functions/pictureUpload';
import { DomSanitizer } from '@angular/platform-browser';

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
        private authService: AuthService,
        private store: Store<BookmarkState>,
        private subpageService: SubpageService,
        private router: Router,
        private socialMediaAuthService: SocialMediaAuthService,
        private sanitizer: DomSanitizer
    ) {}

    ngOnInit() {
      this.store.dispatch(new bookmarkActions.FetchBookmark());
      this.pic$.subscribe(res => console.log(res));
    //   this.store.select(fromAuth.User).subscribe(user => {
    //         if (user) {
    //             this.pic = user.pic;
    //             console.log(this.pic);
    //         }
    //    });
    // console.log(this.pic);
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

