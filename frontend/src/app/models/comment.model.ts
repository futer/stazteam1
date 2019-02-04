import { UserModel } from './user.model';

export interface CommentModel {
  id: string;
  start: number;
  length: number;
  page: number;
  content: string;
  reviewer: UserModel;
}
