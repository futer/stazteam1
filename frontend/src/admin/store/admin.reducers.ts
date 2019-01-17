import * as userState from './admin.states';
import * as userActions from './admin.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState: userState.State = {
    loading: false,
    loaded: false,
    users: null,
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

export const Users = createSelector(
    userFeature,
    (state: userState.State) => state.users
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
                users: null,
                errorMessage: null
            };

            case userActions.userTypes.FETCH_SUCCESS:
            return {
                loading: false,
                loaded: true,
                users: {
                    data: {
                        users: action.payload.data.users
                    }
                },
                errorMessage: null
            };

            case userActions.userTypes.FETCH_ERROR:
            console.log(action.payload);
            return {
                loading: false,
                loaded: false,
                users: null,
                errorMessage: action.payload
            };

            default:
                return state;
        }
}

export default userReducer;
