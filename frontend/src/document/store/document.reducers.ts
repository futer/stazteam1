import { DocumentModel } from '../models/document.model';

export interface State {
  loaded: boolean;
  documents: DocumentModel[] | null;
  // error message
  errorMessage: string | null;
}

export const initialState: State = {
    loaded: false,
    documents: null,
    errorMessage: null
  };
