import { DocumentModel } from '../models/document.model';
import { ErrorData } from '../models/error.model';

export interface State {
    loading: boolean;
    loaded: boolean;
    documents: DocumentModel | null;
    errorMessage: ErrorData | null;
}
