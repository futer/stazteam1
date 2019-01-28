import * as userState from './admin.states';
import * as userActions from './admin.actions';
import { createSelector, createFeatureSelector } from '@ngrx/store';
import { setEnvironment } from '@angular/core/src/render3/instructions';
import { UserWithoutPass } from '../../app/models/user-editor.model';

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
                errorMessage: null,
                sending: false,
                sent: false
            };

            case userActions.userTypes.FETCH_SUCCESS:
            return {
                loading: false,
                loaded: true,
                users: action.payload,
                errorMessage: null,
                sending: false,
                sent: false
            };

            case userActions.userTypes.FETCH_ERROR:
            return {
                loading: false,
                loaded: false,
                users: null,
                errorMessage: action.payload,
                sending: false,
                sent: false
            };

            case userActions.userTypes.SEND:
            return {
                ...state,
                sending: true
            };

            case userActions.userTypes.SEND_SUCCESS:
            state.users.data.users.find(user => user.id === action.payload.id)
                .firstName = action.payload.firstName;
            state.users.data.users.find(user => user.id === action.payload.id)
                .lastName = action.payload.lastName;
            state.users.data.users.find(user => user.id === action.payload.id)
                .pic = action.payload.pic;
            return {
                ...state,
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


            default:
                return state;
        }
}

export default userReducer;
