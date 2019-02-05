import { CommentModel } from '../../app/models/comment.model';
import { StatusEnum } from './status.enum';

export interface DocumentModel {
  data: {
    document: DocModel;
  };
}

interface DocModel {
  author: string;
  content: string;
  status: StatusEnum;
  date: string;
  title: string;
  comments: CommentModel;
}

export interface DocumentsModel {
  data: {
    documents: DocModel[];
  };
}
