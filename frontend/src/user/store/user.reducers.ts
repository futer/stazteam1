import * as userState from './user.states';
import * as userActions from './user.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState: userState.State = {
    errorMessage: null,
    sending: null,
    sent: null
};

export const userFeature = createFeatureSelector<userState.State>('current');

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
            case userActions.currentTypes.SEND:
            return {
                errorMessage: null,
                sending: true,
                sent: false
            };

            case userActions.currentTypes.SEND_SUCCESS:
            return {
                errorMessage: null,
                sending: false,
                sent: true
            };

            case userActions.currentTypes.SEND_ERROR:
            return {
                errorMessage: action.payload,
                sending: false,
                sent: false
            };

            case userActions.currentTypes.DESTROY:
            return initialState;

            default:
                return state;
        }
}

export default userReducer;
