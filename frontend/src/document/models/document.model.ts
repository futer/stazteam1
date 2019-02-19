import { CommentModel } from 'src/app/models/comment.model';

export interface PreviewsModel {
    previews: Array<Object>;
}

export interface DocumentModel {
    data: {
        document: {
            id: string;
            author: string;
            content: string;
            date: string;
            title: string;
            comments?: CommentModel[];
        };
        like: boolean;
    };
}
