import * as authState from './auth.state';
import * as authActions from './auth.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions } from '@ngrx/effects';


export const initialState: authState.AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
};

const getLoginFeatureState = createFeatureSelector<authState.AuthState>('authLogin');

export const getLoginAuth = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.isAuthenticated
);

export const User = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.user
);

export const User2 = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.user.firstName
);

export const Erros = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.errorMessage
);

export function authReducer (
    state: authState.AuthState = initialState,
    actions: authActions.All
): authState.AuthState {
    switch ( actions.type) {
        case authActions.AuthActionTypes.LOGIN_SUCCES:
        console.log('payload', actions.payload);
        return {
           ...state,
           isAuthenticated: true,
           user: actions.payload,
           errorMessage: null
        };

        case authActions.AuthActionTypes.LOGIN_FAIL:
        return {
            ...state,
            errorMessage: actions.payload
        };

        case authActions.AuthActionTypes.LOGOUT:
        return initialState;

        case authActions.AuthActionTypes.RELOAD:
        return state;

        case authActions.AuthActionTypes.RELOAD_SUCCESS:
        return {
            ...state,
            user: actions.payload
        };

        case authActions.AuthActionTypes.RELOAD_FAIL:
        return {
            ...state,
            errorMessage: actions.payload
        };

        default: {
            return state;
        }
    }
}
export default authReducer;
