export interface BookmarkModel {
    id: string;
    title: string;
    position: position;
    content: string;
}

enum position {
    TOP,
    RIGHT
}
