import { Action } from '@ngrx/store';
import { DocumentModel, DocumentsModel } from '../models/document.model';
import { ErrorData } from '../../app/models/error.model';
import { StatusEnum } from '../models/status.enum';

export enum prevsTypes {
  FETCH_PREVS = '[Review] Fetch Prevs',
  FETCH_PREVS_SUCCESS = '[Review] Fetch Prevs Success',
  FETCH_PREVS_ERROR = '[Review] Fetch Prevs Error',
}

export enum prevsByStatusTypes {
  FETCH_PREVS_BY_STATUS = '[Review] Fetch Prevs By Status',
  FETCH_PREVS_BY_STATUS_SUCCESS = '[Review] Fetch Prevs By Status Success',
  FETCH_PREVS_BY_STATUS_ERROR = '[Review] Fetch Prevs By Status Error',
}

export enum docTypes {
  FETCH_DOC = '[Review] Fetch Doc',
  FETCH_DOC_SUCCESS = '[Review] Fetch Doc Success',
  FETCH_DOC_ERROR = '[Review] Fetch Doc Error',
}

export class FetchPrevs implements Action {
  readonly type = prevsTypes.FETCH_PREVS;
  constructor() {}
}

export class FetchPrevsSuccess implements Action {
  readonly type = prevsTypes.FETCH_PREVS_SUCCESS;
  constructor(public payload: DocumentsModel) {}
}

export class FetchPrevsError implements Action {
  readonly type = prevsTypes.FETCH_PREVS_ERROR;
  constructor(readonly payload: ErrorData) {}
}

export class FetchPrevsByStatus implements Action {
  readonly type = prevsByStatusTypes.FETCH_PREVS_BY_STATUS;
  constructor(public payload: StatusEnum) {}
}

export class FetchPrevsByStatusSuccess implements Action {
  readonly type = prevsByStatusTypes.FETCH_PREVS_BY_STATUS_SUCCESS;
  constructor(public payload: DocumentsModel) {}
}

export class FetchPrevsByStatusError implements Action {
  readonly type = prevsByStatusTypes.FETCH_PREVS_BY_STATUS_ERROR;
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

export type AllPrevs =
  | FetchPrevs
  | FetchPrevsSuccess
  | FetchPrevsError
  | FetchPrevsByStatus
  | FetchPrevsByStatusSuccess
  | FetchPrevsByStatusError;

export type AllDoc =
  | FetchDoc
  | FetchDocSuccess
  | FetchDocError;
