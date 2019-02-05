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
        };
        like: boolean;
    };
}
