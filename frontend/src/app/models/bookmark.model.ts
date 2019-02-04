export interface BookmarkModel {
    title: string;
    position: position;
    content: string;
    id: string;
}

enum position {
    TOP,
    RIGHT
}
