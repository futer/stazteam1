export interface PreviewsModel {
    previews: Array<Object>;
}

export interface DocumentModel {
    data: {
        document: {
            author: string;
            content: string;
            date: string;
            title: string;
        };
        like: boolean;
    };
}
