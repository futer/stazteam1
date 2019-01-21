import { DocumentsModel, DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

export interface PrevState {
    loading: boolean;
    loaded: boolean;
    documents: DocumentsModel | null;
    errorMessage: ErrorData | null;
}

export interface DocState {
    loading: boolean;
    loaded: boolean;
    document: DocumentModel | null;
    errorMessage: ErrorData | null;
}

export interface DocModuleState {
    prevs: PrevState;
    doc: DocState;
}
