import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/admin/models/error.model';

export interface BookmarkState {
    currentBookmarkId: string | null;
    bookmarks: BookmarkModel[] | null;
    erroMessage: ErrorData;
    loading: boolean;
    loaded: boolean;
}
