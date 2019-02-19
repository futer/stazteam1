import { MarkedTextModel } from './marked-text.model';

export interface AddCommentModel {
  documentId: string;
  page: number;
  content: string;
  markedText: MarkedTextModel[];
}
