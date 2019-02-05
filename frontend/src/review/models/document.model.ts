import { CommentModel } from 'src/app/models/comment.model';

export interface DocumentModel {
  data: {
    document: {
      author: string;
      content: string;
      date: string;
      title: string;
      comments: CommentModel
    };
  };
}

export interface DocumentsModel {
  data: {
    documents: [DocumentModel];
  };
}
