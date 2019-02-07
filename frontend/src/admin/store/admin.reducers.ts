import * as userState from './admin.states';
import * as userActions from './admin.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState: userState.State = {
    loading: false,
    loaded: false,
    users: null,
    errorMessage: null,
    sending: null,
    sent: null
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

export const SendSuccess = createSelector(
    userFeature,
    (state: userState.State) => state.sent
);

export function userReducer (
    state: userState.State = initialState,
    action: userActions.All
    ): userState.State {
        switch (action.type) {
            case userActions.userTypes.FETCH:
            return {
                ...state,
                loading: true,
                loaded: false,
                users: null,
                errorMessage: null,
            };

            case userActions.userTypes.FETCH_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                users: action.payload,
                errorMessage: null,
            };

            case userActions.userTypes.FETCH_ERROR:
            return {
                ...state,
                loading: false,
                loaded: false,
                users: null,
                errorMessage: action.payload,
            };

            case userActions.userTypes.SEND:
            return {
                ...state,
                sending: true,
                sent: false
            };

            case userActions.userTypes.SEND_SUCCESS:
            return {
                ...state,
                errorMessage: null,
                sending: false,
                sent: true
            };

            case userActions.userTypes.SEND_ERROR:
            return {
                loading: false,
                loaded: false,
                users: null,
                errorMessage: action.payload,
                sending: false,
                sent: false
            };

            case userActions.userTypes.DESTROY:
            return initialState;

            default:
                return state;
        }
}

export default userReducer;
