import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ReviewService } from '../services/review.service';
import * as AllActions from './review.actions';
import { DocumentsModel, DocumentModel } from '../models/document.model';
import { ErrorData } from '../../app/models/error.model';
import { Fetch } from 'src/admin/store/admin.actions';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions$: Actions,
    private reviewService: ReviewService,
  ) {}

  @Effect()
  FetchPrevs$: Observable<any> = this.actions$
    .ofType(AllActions.prevsTypes.FETCH_PREVS)
      .pipe(
        switchMap(
          () => this.reviewService.fetchPrevs()
            .pipe(
              map(
                (docs: DocumentsModel) => new AllActions.FetchPrevsSuccess(docs)
              ),
              catchError(
                (error: ErrorData) => of(new AllActions.FetchPrevsError(error))
              )
            )
        )
      );

  @Effect()
  FetchPrevsByStatus$: Observable<any> = this.actions$
    .ofType(AllActions.prevsByStatusTypes.FETCH_PREVS_BY_STATUS)
      .pipe(
        switchMap(
          prevAction => this.reviewService.fetchPrevsByStatus(prevAction['payload'])
            .pipe(
              map(
                (prevs: DocumentsModel) => new AllActions.FetchPrevsByStatusSuccess(prevs)
              ),
              catchError(
                (error: ErrorData) => of(new AllActions.FetchPrevsByStatusError(error))
              )
            )
        )
      );

  @Effect()
  FetchDoc$: Observable<any> = this.actions$
  .ofType(AllActions.docTypes.FETCH_DOC)
    .pipe(
      switchMap(
        docAction => this.reviewService.fetchDoc(docAction['payload'])
          .pipe(
              map(
                (doc: DocumentModel) => new AllActions.FetchDocSuccess(doc)
              ),
              catchError(
                (error: ErrorData) => of(new AllActions.FetchDocError(error))
              )
          )
      )
    );
}
