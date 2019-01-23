import * as bookmarkState from './bookmark.state';
import { createFeatureSelector, createSelector } from '@ngrx/store';
import * as bookmarkActions from './bookmark.actions';


export const initialState: bookmarkState.BookmarkState = {
    loading: false,
    loaded: false,
    subpage: null,
    erroMessage: null
};

export const bookmarkFeature = createFeatureSelector<bookmarkState.BookmarkState>('bookmarks');

export const isLoading = createSelector (
    bookmarkFeature,
    (state: bookmarkState.BookmarkState) => state.loading
);

export const isLoaded = createSelector(
    bookmarkFeature,
    (state: bookmarkState.BookmarkState) => state.loaded
);

export const Subpage = createSelector (
    bookmarkFeature,
    (state: bookmarkState.BookmarkState) => state.subpage
);

export const Error = createSelector (
    bookmarkFeature,
    (state: bookmarkState.BookmarkState) => state.erroMessage
);

export function bookmarkReducer(
    state: bookmarkState.BookmarkState = initialState,
    action: bookmarkActions.All
): bookmarkState.BookmarkState {
    switch (action.type) {
        case bookmarkActions.bookmarkTypes.FETCH:

        return {
            loading: true,
            loaded: false,
            subpage: null,
            erroMessage: null
        };

        case bookmarkActions.bookmarkTypes.FETCH_SUCCESS:

        return {
            loading: false,
            loaded: true,
            subpage: action.payload,
            erroMessage: null
        };

        case bookmarkActions.bookmarkTypes.FETCH_FAILD:

        return{
            loading: false,
            loaded: false,
            subpage: null,
            erroMessage: action.payload
        };

        default:

        return state;

    }
}
export default bookmarkReducer;
export const getBookmarksSubpage = (state: bookmarkState.BookmarkState) => state.subpage;
