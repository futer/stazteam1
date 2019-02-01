export interface DocumentsModel {
    data: {
        documents: Array<Object>;
    };
}

export interface DocumentModel {
    data: {
        document: {
            author: string;
            content: string;
            date: string;
            title: string;
        };
    };
}
