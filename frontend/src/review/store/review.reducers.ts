import * as States from './review.states';
import * as Actions from './review.actions';

export const initialPrevState: States.PrevState = {
  loading: false,
  loaded: false,
  previews: { data: { documents: [] } },
  errorMessage: null,
};

export const initialCommentsState: States.CommentsState = {
  loading: false,
  loaded: false,
  comments: [],
  errorMessage: null,
};

export function prevsReducer(
  state: States.PrevState = initialPrevState,
  action: Actions.AllPrevsTypes
): States.PrevState {
  switch (action.type) {
    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };

    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: [
              ...state.previews.data.documents,
              ...action.payload.data.documents
            ],
          }
        },
        errorMessage: null,
      };

    case Actions.acceptedPrevsTypes.FETCH_ACCEPTED_PREVS_ERROR:
      return {
        loading: false,
        loaded: false,
        previews: { data: { documents: [] } },
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: [
              ...state.previews.data.documents,
              ...action.payload.data.documents
            ],
          }
        },
        errorMessage: null,
      };

    case Actions.pendingPrevsTypes.FETCH_PENDING_PREVS_ERROR:
      return {
        ...state,
        loading: false,
        loaded: false,
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    case Actions.rejectedPrevsTypes.FETCH_REJECTED_PREVS:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };

    case Actions.rejectedPrevsTypes.FETCH_REJECTED_PREVS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        previews: {
          data: {
            documents: [
              ...state.previews.data.documents,
              ...action.payload.data.documents
            ],
          }
        },
        errorMessage: null,
      };

    case Actions.rejectedPrevsTypes.Fetch_REJECTED_PREVS_ERROR:
      return {
        loading: false,
        loaded: false,
        previews: { data: { documents: [] } },
        errorMessage: {
          type: action.type,
          error: action.payload,
        }
      };

    default:
      return state;
  }
}

export function commentsReducer(
  state: States.CommentsState = initialCommentsState,
  action: Actions.AllDocumentCommentsTypes
): States.CommentsState {
  switch (action.type) {
    case Actions.fetchDocumentCommentsTypes.FETCH_DOCUMENT_COMMENTS:
      return {
        ...state,
        loading: true,
        loaded: false,
        errorMessage: null,
      };

    case Actions.fetchDocumentCommentsTypes.FETCH_DOCUMENT_COMMENTS_SUCCESS:
      return {
        loading: false,
        loaded: true,
        comments: action.payload,
        errorMessage: null,
      };

    case Actions.fetchDocumentCommentsTypes.FETCH_DOCUMENT_COMMENTS_ERROR:
      return {
        loading: false,
        loaded: false,
        comments: [],
        errorMessage: {
          type: action.type,
          error: action.payload,
        },
      };
    default:
      return state;
  }
}

export const reviewModuleReducers = {
  prevs: prevsReducer,
  comments: commentsReducer,
};

export default reviewModuleReducers;
