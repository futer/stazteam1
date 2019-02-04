import * as fromAuth from './auth/auth.reducers';
import * as fromBookmark from '././bookmark/bookmark.reducers';
import * as BookmarkState from './bookmark/bookmark.state';
import * as AuthState from './auth/auth.state';
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
