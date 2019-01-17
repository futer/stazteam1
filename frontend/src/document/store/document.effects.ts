import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { DocumentService } from '../services/document.service';
import * as docActions from './document.actions';
import { DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

@Injectable()
export class DocumentEffects {
    constructor(
        private actions$: Actions,
        private documentService: DocumentService
    ) {}

    @Effect()
    FetchPrevs$: Observable<any> = this.actions$
        .ofType(docActions.docTypes.FETCH_PREVS)
        .pipe(
            switchMap(() =>
                this.documentService.fetchPrevs().pipe(
                    map(
                        (docs: DocumentModel) =>
                            new docActions.FetchSuccess(docs)
                    ),
                    catchError((error: ErrorData) =>
                        of(new docActions.FetchError(error))
                    )
                )
            )
        );
    @Effect()
    FetchDoc$: Observable<any> = this.actions$
        .ofType(docActions.docTypes.FETCH_DOC)
        .pipe(
            switchMap(docAction =>
                this.documentService.fetchDocument(docAction['payload']).pipe(
                    map(
                        (docs: DocumentModel) =>
                            new docActions.FetchSuccess(docs)
                    ),
                    catchError((error: ErrorData) =>
                        of(new docActions.FetchError(error))
                    )
                )
            )
        );
}
