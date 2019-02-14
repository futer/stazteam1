import { DocumentsModel } from '../models/document.model';
import { CommentModel } from 'src/app/models/comment.model';
import { ErrorData } from '../../app/models/error.model';

export interface PrevState {
  loading: boolean;
  loaded: boolean;
  previews: DocumentsModel | null;
  errorMessage: ErrorData | null;
}

export interface CommentsState {
  loading: boolean;
  loaded: boolean;
  comments: CommentModel[] | null;
  errorMessage: ErrorData | null;
}

export interface ReviewModuleState {
  prevs: PrevState;
  comments: CommentsState;
}
