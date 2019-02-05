import { Component, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PrevState } from '../store/document.states';
import * as Actions from '../store/document.actions';
import {
    getPrevs,
    getPrevsError,
    arePrevsLoaded,
    areLikedLoaded,
    getLiked,
    getLikedError,
    arePrevsLoading
} from '../store/document.selectors';
import { ErrorData } from '../models/error.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
    prevs$: Observable<any> = this.store.select(getPrevs);
    liked$: Observable<any>;
    errorHandler$: Observable<ErrorData>;

    loading$: Observable<boolean> = this.store.select(arePrevsLoading);

    constructor(private router: Router, private store: Store<PrevState>) {}

    url = this.router.url;
    page = -1;
    ngOnInit() {
        if (this.url === '/main') {
            this.store
                .select(arePrevsLoaded)
                .subscribe(load => {
                    if (!load) {
                        this.store.dispatch(new Actions.FetchPrevs(++this.page));
                    }

                    // this.prevs$ = this.store.select(getPrevs);
                    // this.errorHandler$ = this.store.select(getPrevsError);
                }).unsubscribe();
        }

        if (this.url === '/favourites') {
            this.store
                .select(areLikedLoaded)
                .subscribe(load => {
                    if (!load) {
                        this.store.dispatch(new Actions.FetchLiked());
                    }

                    this.prevs$ = this.store.select(getLiked);
                    this.errorHandler$ = this.store.select(getLikedError);
                }).unsubscribe();
        }
    }

    onScroll() {
        this.store.dispatch(new Actions.FetchPrevs(++this.page));
    }
}
