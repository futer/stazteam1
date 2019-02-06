import * as fromBookmark from '././bookmark/bookmark.reducers';
import * as BookmarkState from './bookmark/bookmark.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CoreState {
    bookmarks: BookmarkState.BookmarkState;
}

export const reducers:  ActionReducerMap<CoreState> = {
    bookmarks: fromBookmark.bookmarkReducer,
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export const getBookmarkState = createSelector(
    getCoreState,
    (state: CoreState) => state.bookmarks
);

export const getBookmarksSubpage = createSelector(
    getBookmarkState,
    fromBookmark.getBookmarksSubpage
);

export const getLoading = createSelector (
    getBookmarkState,
    state => state.loading
);

export const getLoaded = createSelector(
    getBookmarkState,
    state => state.loaded
);
