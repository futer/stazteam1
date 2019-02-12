import { UserModel } from './user.model';
import { MarkedTextModel } from 'src/review/models/marked-text.model';

export interface CommentModel {
  id: string;
  page: number;
  content: string;
  markedText: MarkedTextModel[];
  reviewer: UserModel;
}
