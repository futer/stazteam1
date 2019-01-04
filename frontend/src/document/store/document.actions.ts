import { Action } from '@ngrx/store';
// import { DocumentModel } from '../models/document.model';

export enum docTypes {
  FETCH = '[Document] Fetch'
}

export class Fetch implements Action {
    readonly type = docTypes.FETCH;
    constructor() {}
}

export type All =
    | Fetch;
