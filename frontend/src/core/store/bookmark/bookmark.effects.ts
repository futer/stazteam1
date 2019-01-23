import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { SubpageService } from 'src/shared/services/subpage.service';
import { Observable, of } from 'rxjs';
import * as bookmarkActions from './bookmark.actions';
import { switchMap, catchError, map } from 'rxjs/operators';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/admin/models/error.model';
import { core } from '@angular/compiler';
import { Subpage } from './bookmark.reducers';

@Injectable()
export class BookmarkEffect {
    constructor( private actions$: Actions,
        private subpageService: SubpageService) {}

    @Effect()
    Fetch$: Observable<any> = this.actions$
        .ofType(bookmarkActions.bookmarkTypes.FETCH)
        .pipe(
            switchMap(() =>
            this.subpageService.fetchBookmarks().pipe(
                map((bookmark: BookmarkModel[]) => {
                    const bookmarkData = { ...bookmark, ...bookmark['data']};
                    delete bookmarkData.data;
                    return new bookmarkActions.FetchSuccess(bookmarkData.bookmarks);
                }),
                catchError((error: ErrorData) => of(new bookmarkActions.FetchFaild(error)))
            )
            )
        );
    }
