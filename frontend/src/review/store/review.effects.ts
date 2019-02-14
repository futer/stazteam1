import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { ReviewService } from '../services/review.service';
import * as AllActions from './review.actions';
import { DocumentsModel, DocumentModel } from '../models/document.model';
import { ErrorData } from '../../app/models/error.model';
import { StatusEnum } from '../models/status.enum';

@Injectable()
export class ReviewEffects {
  constructor(
    private actions$: Actions,
    private reviewService: ReviewService,
  ) {}

@Effect()
FetchAcceptedPrevs$: Observable<any> = this.actions$
  .ofType(AllActions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS)
  .pipe(
    switchMap(
      prevAction => this.reviewService.fetchPrevsByStatus(prevAction['payload'], StatusEnum.ACCEPTED)
        .pipe(
          map(
            (prevs: DocumentsModel) => new AllActions.FetchAcceptedPrevsSuccess(prevs)
          ),
          catchError(
            (error: ErrorData) => of(new AllActions.FetchAcceptedPrevsError(error))
          )
        )
    )
  );

@Effect()
FetchPendingPrevs$: Observable<any> = this.actions$
  .ofType(AllActions.pendingPrevsTypes.FETCH_PENDING_PREVS)
  .pipe(
    switchMap(
      prevAction => this.reviewService.fetchPrevsByStatus(prevAction['payload'], StatusEnum.PENDING)
        .pipe(
          map(
            (prevs: DocumentsModel) => new AllActions.FetchPendingPrevsSuccess(prevs)
          ),
          catchError(
            (error: ErrorData) => of(new AllActions.FetchPendingPrevsError(error))
          )
        )
    )
  );

@Effect()
FetchRejectedPrevs$: Observable<any> = this.actions$
  .ofType(AllActions.rejectedPrevsTypes.FETCH_REJECTED_PREVS)
  .pipe(
    switchMap(
      prevAction => this.reviewService.fetchPrevsByStatus(prevAction['payload'], StatusEnum.REJECTED)
        .pipe(
          map(
            (prevs: DocumentsModel) => new AllActions.FetchRejectedPrevsSuccess(prevs)
          ),
          catchError(
            (error: ErrorData) => of(new AllActions.FetchRejectedPrevsError(error))
          )
        )
    )
  );

@Effect()
FetchDocumentComments$: Observable<any> = this.actions$
  .ofType(AllActions.fetchDocumentCommentsTypes.FETCH_DOCUMENT_COMMENTS)
  .pipe(
    switchMap(
      action => this.reviewService.fetchDocumentComments(action['payload'])
        .pipe(
          map(
            (comments) => new AllActions.FetchDocumentCommentsSuccess(comments.data.comments)
          ),
          catchError(
            (error: ErrorData) => of(new AllActions.FetchDocumentCommentsError(error))
          )
        )
    )
  );
}
