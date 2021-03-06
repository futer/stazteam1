import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
    arePrevsLoading,
    areLikedLoading
} from '../store/document.selectors';
import { ErrorData } from '../models/error.model';
import { Router } from '@angular/router';

@Component({
    selector: 'app-container',
    templateUrl: './container.component.html',
    styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
    private static prevPage = -1;
    private static likedPage = -1;

    prevs$: Observable<any> = this.store.select(getPrevs);
    liked$: Observable<any> = this.store.select(getLiked);

    prevErrorHandler$: Observable<ErrorData> = this.store.select(getPrevsError);
    likedErrorHandler$: Observable<ErrorData> = this.store.select(
        getLikedError
    );

    prevLoading$: Observable<boolean> = this.store.select(arePrevsLoading);
    likedLoading$: Observable<boolean> = this.store.select(areLikedLoading);

    constructor(private router: Router, private store: Store<PrevState>) {}

    private url = this.router.url;

    ngOnInit() {
        switch (this.url) {
            case '/main':
                this.store
                    .select(arePrevsLoaded)
                    .subscribe(load => {
                        if (!load) {
                            this.store.dispatch(
                                new Actions.FetchPrevs(
                                    ++ContainerComponent.prevPage
                                )
                            );
                        }
                    })
                    .unsubscribe();
                break;
            case '/favourites':
                this.store
                    .select(areLikedLoaded)
                    .subscribe(load => {
                        if (!load) {
                            this.store.dispatch(
                                new Actions.FetchLiked(
                                    ++ContainerComponent.likedPage
                                )
                            );
                        }
                    })
                    .unsubscribe();
                break;

            default:
                break;
        }
    }

    onScrollPrev() {
        this.store.dispatch(
            new Actions.FetchPrevs(++ContainerComponent.prevPage)
        );
    }

    onScrollLiked() {
        this.store.dispatch(
            new Actions.FetchLiked(++ContainerComponent.likedPage)
        );
    }
}
