export interface BookmarkModel {
    title: string;
    position: position;
    content: string;
}

enum position {
    TOP,
    LEFT
}
