import { Action } from '@ngrx/store';
import { DocumentModel, DocumentsModel } from '../models/document.model';
import { ErrorData } from '../../app/models/error.model';
import { StatusEnum } from '../models/status.enum';

export enum acceptedPrevsTypes {
  FETCH_ACCEPTED_PREVS = '[Review] Fetch Accepted Prevs',
  FETCH_ACCEPTED_PREVS_SUCCESS = '[Review] Fetch Accepted Prevs Success',
  FETCH_ACCEPTED_PREVS_ERROR = '[Review] Fetch Accepted Prevs Error'
}

export enum pendingPrevsTypes {
  FETCH_PENDING_PREVS = '[Review] Fetch Pending Prevs',
  FETCH_PENDING_PREVS_SUCCESS = '[Review] Fetch Pending Prevs Success',
  FETCH_PENDING_PREVS_ERROR = '[Review] Fetch Pending Prevs Error',
}

export enum rejectedPrevsTypes {
  FETCH_REJECTED_PREVS = '[Review] Fetch Rejected Prevs',
  FETCH_REJECTED_PREVS_SUCCESS = '[Review] Fetch Rejected Prevs Success',
  Fetch_REJECTED_PREVS_ERROR = '[Review] Fetch Rejected Prevs Error',
}

export enum docTypes {
  FETCH_DOC = '[Review] Fetch Doc',
  FETCH_DOC_SUCCESS = '[Review] Fetch Doc Success',
  FETCH_DOC_ERROR = '[Review] Fetch Doc Error',
}

export class FetchAcceptedPrevs implements Action {
  readonly type = acceptedPrevsTypes.FETCH_ACCEPTED_PREVS;
  constructor() {}
}

export class FetchAcceptedPrevsSuccess implements Action {
  readonly type = acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_SUCCESS;
  constructor(public payload: DocumentsModel) {}
}

export class FetchAcceptedPrevsError implements Action {
  readonly type = acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_ERROR;
  constructor(readonly payload: ErrorData) {}
}

export class FetchPendingPrevs implements Action {
  readonly type = pendingPrevsTypes.FETCH_PENDING_PREVS;
  constructor() {}
}

export class FetchPendingPrevsSuccess implements Action {
  readonly type = pendingPrevsTypes.FETCH_PENDING_PREVS_SUCCESS;
  constructor(public payload: DocumentsModel) {}
}

export class FetchPendingPrevsError implements Action {
  readonly type = pendingPrevsTypes.FETCH_PENDING_PREVS_ERROR;
  constructor(readonly payload: ErrorData) {}
}

export class FetchRejectedPrevs implements Action {
  readonly type = rejectedPrevsTypes.FETCH_REJECTED_PREVS;
  constructor() {}
}

export class FetchRejectedPrevsSuccess implements Action {
  readonly type = rejectedPrevsTypes.FETCH_REJECTED_PREVS_SUCCESS;
  constructor(public payload: DocumentsModel) {}
}

export class FetchRejectedPrevsError implements Action {
  readonly type = rejectedPrevsTypes.Fetch_REJECTED_PREVS_ERROR;
  constructor(readonly payload: ErrorData) {}
}

export class FetchDoc implements Action {
  readonly type = docTypes.FETCH_DOC;
  constructor(public payload: string) {}
}

export class FetchDocSuccess implements Action {
  readonly type = docTypes.FETCH_DOC_SUCCESS;
  constructor(public payload: DocumentModel) {}
}

export class FetchDocError implements Action {
  readonly type = docTypes.FETCH_DOC_ERROR;
  constructor(readonly payload: ErrorData) {}
}

export type AllPrevsTypes =
  | FetchAcceptedPrevs
  | FetchAcceptedPrevsSuccess
  | FetchAcceptedPrevsError
  | FetchPendingPrevs
  | FetchPendingPrevsSuccess
  | FetchPendingPrevsError
  | FetchRejectedPrevs
  | FetchRejectedPrevsSuccess
  | FetchRejectedPrevsError;

export type AllDocTypes =
  | FetchDoc
  | FetchDocSuccess
  | FetchDocError;
