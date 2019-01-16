export interface DocumentModel {
    data: {
        documents: Array<Object>;
    };
}

export interface Document {
    title: string;
    author: string;
    date: string;
    content: string;
}
