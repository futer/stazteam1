import * as bookmarkState from './bookmark.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as bookmarkActions from './bookmark.actions';

export const initialState: bookmarkState.BookmarkState = {
    currentBookmarkId: null,
    bookmarks: [],
    erroMessage: null,
    loading: false,
    loaded: false
};

export const bookmarkFeature = createFeatureSelector<bookmarkState.BookmarkState>('bookmarks');

export const getBookmarks = createSelector (
    bookmarkFeature,
    state => state.bookmarks
);

export const getLoading = createSelector (
    bookmarkFeature,
    state => state.loading
);

export const getLoaded = createSelector (
    bookmarkFeature,
    state => state.loaded
);

export function bookmarkReducer(
    state: bookmarkState.BookmarkState = initialState,
    action: bookmarkActions.All
): bookmarkState.BookmarkState {
    switch (action.type) {
        case bookmarkActions.bookmarkTypes.SET_CURRENT_BOOKMARK:
        return {
            ...state,
            currentBookmarkId: action.payload.id
        };

        case bookmarkActions.bookmarkTypes.FETCH_BOOKMARK:
        return {
            ...state,
            loading: true,
            loaded: false
        };

        case bookmarkActions.bookmarkTypes.FETCH_BOOKMARK_SUCCESS:
        return {
           ...state,
           bookmarks: action.payload,
           erroMessage: null,
           loading: false,
           loaded: true
       };

        case bookmarkActions.bookmarkTypes.FETCH_BOOKMARK_FAILD:
        return{
            ...state,
            loading: false,
            loaded: false,
            bookmarks: [],
            erroMessage: action.payload
        };

        case bookmarkActions.bookmarkTypes.UPDATE_SUCCESS:
            return {
                ...state,
                bookmarks: state.bookmarks.map(
                    item => action.payload.payload.id
                         === item.id
                         ? action.payload.payload
                         : item
                        )
            };

        case bookmarkActions.bookmarkTypes.UPDATE_FAILD:
        return {
            ...state,
            erroMessage: action.payload
        };

        case bookmarkActions.bookmarkTypes.DELETE_SUCCESS:
        return {
            ...state,
            bookmarks: state.bookmarks.filter(bookmark => bookmark.id !== action.payload.payload),
            currentBookmarkId: null,
            erroMessage: null
        };

        case bookmarkActions.bookmarkTypes.DELETE_FAILD:
        return {
            ...state,
            erroMessage: action.payload
        };

        case bookmarkActions.bookmarkTypes.ADD_BOOKMARK_SUCCESS:
        return {
            ...state,
            bookmarks: [...state.bookmarks, action.payload],
            erroMessage: null
        };

        case bookmarkActions.bookmarkTypes.ADD_BOOKMARK_FAILD:
        return {
            ...state,
            erroMessage: action.payload
        };

        default:
        return state;
    }
}
export default bookmarkReducer;
