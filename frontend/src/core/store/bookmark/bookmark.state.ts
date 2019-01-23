import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ErrorData } from 'src/admin/models/error.model';

export interface BookmarkState {
    loading: boolean;
    loaded: boolean;
    subpage: BookmarkModel[] | null;
    erroMessage: ErrorData;
}
