import * as authState from './auth.state';
import * as authActions from './auth.actions';

export const initialState: authState.AuthState = {
    isAuthenticated: false,
    user: null,
    errorMessage: null
};

export function Reducer (
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
            errorMessage: 'Incorrect email and/or password.'
        };
        default: {
            return state;
        }
    }

}
