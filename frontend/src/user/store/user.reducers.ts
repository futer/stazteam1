import * as userState from './user.states';
import * as userActions from './user.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState: userState.State = {
    loading: false,
    loaded: false,
    currentUser: null,
    errorMessage: null,
};

export const userFeature = createFeatureSelector<userState.State>('users');

export const isLoading = createSelector(
    userFeature,
    (state: userState.State) => state.loading
);

export const isLoaded = createSelector(
    userFeature,
    (state: userState.State) => state.loaded
);

export const CurrentUser = createSelector(
    userFeature,
    (state: userState.State) => state.currentUser
);

export const Errors = createSelector(
    userFeature,
    (state: userState.State) => state.errorMessage
);

export function userReducer (
    state: userState.State = initialState,
    action: userActions.All
    ): userState.State {
        switch (action.type) {
            case userActions.userTypes.FETCH:
            return {
                loading: true,
                loaded: false,
                currentUser: null,
                errorMessage: null
            };

            case userActions.userTypes.FETCH_SUCCESS:
            return {
                loading: false,
                loaded: true,
                currentUser: action.payload,
                errorMessage: null
            };

            case userActions.userTypes.FETCH_ERROR:
            return {
                loading: false,
                loaded: false,
                currentUser: null,
                errorMessage: action.payload
            };

            default:
                return state;
        }
}

export default userReducer;
