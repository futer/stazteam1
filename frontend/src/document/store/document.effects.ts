import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DocumentService } from '../services/document.service';
import * as AllActions from './document.actions';
import { PreviewsModel, DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

@Injectable()
export class DocumentEffects {
    constructor(
        private actions$: Actions,
        private documentService: DocumentService
    ) {}

    @Effect()
    FetchPrevs$: Observable<any> = this.actions$
        .ofType(AllActions.prevsTypes.FETCH_PREVS)
        .pipe(
            switchMap(() =>
                this.documentService.fetchPrevs().pipe(
                    map(
                        (docs: PreviewsModel) =>
                            new AllActions.FetchPrevsSuccess(docs)
                    ),
                    catchError((error: ErrorData) =>
                        of(new AllActions.FetchPrevsError(error))
                    )
                )
            )
        );

        @Effect()
        FetchLiked$: Observable<any> = this.actions$
            .ofType(AllActions.likedTypes.FETCH_LIKED)
            .pipe(
                switchMap(() =>
                    this.documentService.fetchLiked().pipe(
                        map(
                            (docs: PreviewsModel) =>
                                new AllActions.FetchLikedSuccess(docs)
                        ),
                        catchError((error: ErrorData) =>
                            of(new AllActions.FetchLikedError(error))
                        )
                    )
                )
            );

    @Effect()
    FetchDoc$: Observable<any> = this.actions$
        .ofType(AllActions.docTypes.FETCH_DOC)
        .pipe(
            switchMap(docAction =>
                this.documentService.fetchDocument(docAction['payload']).pipe(
                    map(
                        (docs: DocumentModel) =>
                            new AllActions.FetchDocSuccess(docs)
                    ),
                    catchError((error: ErrorData) =>
                        of(new AllActions.FetchDocError(error))
                    )
                )
            )
        );
}
