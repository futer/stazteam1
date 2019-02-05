import * as States from './review.states';
import * as Actions from './review.actions';
import docModuleReducers from 'src/document/store/document.reducers';
import { prevsTypes } from 'src/document/store/document.actions';

export const initialPrevState: States.PrevState = {
  loading: false,
  loaded: false,
  previews: null,
  errorMessage: null,
};

export const initialDocState: States.DocState = {
  loading: false,
  loaded: false,
  document: null,
  errorMessage: null,
};

export function prevsReducer(
  state: States.PrevState = initialPrevState,
  action: Actions.AllPrevsTypes
): States.PrevState {
  switch (action.type) {
    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS:
      return {
        loading: true,
        loaded: false,
        previews: null,
        errorMessage: null,
      };

    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: action.payload.data.documents,
          }
        },
        errorMessage: null,
      };

    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_ERROR:
      return {
        loading: false,
        loaded: false,
        previews: null,
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS:
      return {
        loading: true,
        loaded: false,
        previews: null,
        errorMessage: null,
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: action.payload.data.documents,
          }
        },
        errorMessage: null,
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS_ERROR:
      return {
        loading: false,
        loaded: false,
        previews: null,
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    case Actions.rejectedPrevsTypes.FETCH_REJECTED_PREVS:
      return {
        loading: true,
        loaded: false,
        previews: null,
        errorMessage: null,
      };

    case Actions.rejectedPrevsTypes.FETCH_REJECTED_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: action.payload.data.documents,
          }
        },
        errorMessage: null,
      };

    case Actions.rejectedPrevsTypes.Fetch_REJECTED_PREVS_ERROR:
      return {
        loading: false,
        loaded: false,
        previews: null,
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    default:
      return state;
  }
}

export function docReducer(
  state: States.DocState = initialDocState,
  action: Actions.AllDocTypes
): States.DocState {
  switch (action.type) {
    case Actions.docTypes.FETCH_DOC:
      return {
        loading: true,
        loaded: false,
        document: null,
        errorMessage: null,
      };

    case Actions.docTypes.FETCH_DOC_SUCCESS:
      return {
        loading: false,
        loaded: true,
        document: action.payload,
        errorMessage: null,
      };

    case Actions.docTypes.FETCH_DOC_ERROR:
      return {
        loading: false,
        loaded: false,
        document: null,
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    default:
      return state;
  }
}

export const reviewModuleReducers = {
  prevs: prevsReducer,
  doc: docReducer,
};

export default docModuleReducers;
