import { DocumentsModel, DocumentModel } from '../models/document.model';
import { ErrorData } from '../../app/models/error.model';

export interface PrevState {
  loading: boolean;
  loaded: boolean;
  previews: DocumentsModel | null;
  errorMessage: ErrorData | null;
}

export interface DocState {
  loading: boolean;
  loaded: boolean;
  document: DocumentModel | null;
  errorMessage: ErrorData | null;
}

export interface ReviewModuleState {
  prevs: PrevState;
  doc: DocState;
}
