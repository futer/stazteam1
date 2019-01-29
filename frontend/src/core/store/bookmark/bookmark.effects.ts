import { Injectable } from '@angular/core';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { SubpageService } from 'src/shared/services/subpage.service';
import { Observable, of } from 'rxjs';
import * as bookmarkActions from './bookmark.actions';
import { switchMap, catchError, map, mergeMap } from 'rxjs/operators';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/admin/models/error.model';


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


        @Effect()
        Update$: Observable<any> = this.actions$
            .ofType(bookmarkActions.bookmarkTypes.UPDATE)
            .pipe(
                switchMap((payload) =>
                    this.subpageService.update(payload).pipe(
                        map((bookmark: BookmarkModel) => new bookmarkActions.UpdateSucces(bookmark)),
                        catchError((error: ErrorData) => of(new bookmarkActions.UpdateFaild(error)))
                    )
                )
            );

        // @Effect()
        // Delete$: Observable<any> = this.actions$
        //     .ofType(bookmarkActions.bookmarkTypes.DELETE)
        //     .pipe(
        //         switchMap((payload) =>
        //         this.subpageService.delete(payload).pipe(
        //             map((bookmark: BookmarkModel) => console.log(payload)),
        //             catchError((error: ErrorData) => of(new bookmarkActions.DeleteFaild(error)))

        //         )
        //     )
        // );

}
