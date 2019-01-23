import * as fromAuth from './auth/auth.reducers';
import * as fromBookmark from '././bookmark/bookmark.reducers';
import * as BookmarkState from './bookmark/bookmark.state';
import * as AuthState from './auth/auth.state';
import { ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';

export interface CoreState {
    bookmarks: BookmarkState.BookmarkState;
    auth: AuthState.AuthState;
}

export const reducers:  ActionReducerMap<CoreState> = {
    bookmarks: fromBookmark.bookmarkReducer,
    auth: fromAuth.authReducer
};

export const getCoreState = createFeatureSelector<CoreState>('core');

export const getBookmarkState = createSelector(
    getCoreState,
    (state: CoreState) => state.auth,
    (state: CoreState) => state.bookmarks
);

export const getBookmarksSubpage = createSelector(
    getBookmarkState,
    fromBookmark.getBookmarksSubpage
);

