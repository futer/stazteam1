import { Component, OnInit, Input } from '@angular/core';
import { NavService } from '../services/nav/nav.service';
import { AuthService } from '../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { Logout } from '../store/auth/auth.actions';
import { SubpageService } from 'src/shared/services/subpage.service';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { CoreState } from '../store';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/observable';
import * as fromAuth from '../store/auth/auth.reducers';

@Component({
    selector: 'app-nav',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {
   @Input() bookmark$: Observable<any>;
   name$: Observable<any> = this.store.select(fromAuth.User);

    constructor(
        private authService: AuthService,
        private store: Store<CoreState>,
        private subpageService: SubpageService,
        private router: Router
    ) {}

    ngOnInit() {
        this.store.dispatch(new bookmarkActions.FetchBookmark());
    }

    logOut() {
        this.store.dispatch(new AuthActions.Logout());
    }

    navigateToSubpage(title: string) {
        this.router.navigate(['/subpage', title]);
    }
}
