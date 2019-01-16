import * as authState from './auth.state';
import * as authActions from './auth.actions';

import { createFeatureSelector, createSelector } from '@ngrx/store';
import { Actions } from '@ngrx/effects';


export const initialState: authState.AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null,
    navbarDisplayed: false
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

export const Erros = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.errorMessage
);

export const Navbar = createSelector(
    getLoginFeatureState,
    (state: authState.AuthState) => state.navbarDisplayed
);

export function authReducer (
    state: authState.AuthState = initialState,
    actions: authActions.All
): authState.AuthState {
    switch ( actions.type) {
        case authActions.AuthActionTypes.LOGIN_SUCCES:
        return {
           ...state,
           isAuthenticated: true,
           user: {
               token: actions.payload.token,
               email: actions.payload.email
           },
           errorMessage: null
        };

        case authActions.AuthActionTypes.LOGIN_FAIL:
        return {
            ...state,
            errorMessage: actions.payload
        };

        case authActions.AuthActionTypes.LOGOUT:
        return initialState;

        case authActions.AuthActionTypes.TOGGLE_NAVBAR:
        return {
            ...state,
            navbarDisplayed: actions.payload
        };

        default: {
            return state;
        }
    }
}
export default authReducer;
