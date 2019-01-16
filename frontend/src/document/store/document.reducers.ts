import * as docState from './document.states';
import * as docActions from './document.actions';

import { createSelector, createFeatureSelector } from '@ngrx/store';

export const initialState: docState.State = {
    loading: false,
    loaded: false,
    documents: null,
    errorMessage: null
};

export const docFeature = createFeatureSelector<docState.State>('documents');

export const isLoading = createSelector(
  docFeature,
  (state: docState.State) => state.loading
);

export const isLoaded = createSelector(
  docFeature,
  (state: docState.State) => state.loaded
);

export const getDocs = createSelector(
  docFeature,
  (state: docState.State) => state.documents
);

export const getErrors = createSelector(
  docFeature,
  (state: docState.State) => state.errorMessage
);

export function docReducer (
  state: docState.State = initialState,
  action: docActions.All
): docState.State {
  switch (action.type) {
    case docActions.docTypes.FETCH:

    return {
      loading: true,
      loaded: false,
      documents: null,
      errorMessage: null
    };

    case docActions.docTypes.FETCH_SUCCESS:

    return {
      loading: false,
      loaded: true,
      documents: {
        data: {
          documents: action.payload.data.documents
        }
      },
      errorMessage: null
    };

    case docActions.docTypes.FETCH_ERROR:

    return {
      loading: false,
      loaded: false,
      documents: null,
      errorMessage: {
        type: action.type,
        error: action.payload
      }
    };

    default:
      return state;
  }
}

export default docReducer;
