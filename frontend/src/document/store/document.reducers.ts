import * as States from './document.states';
import * as Actions from './document.actions';

export const initialPrevState: States.PrevState = {
    loading: false,
    loaded: false,
    documents: null,
    errorMessage: null
};

export const initialDocState: States.DocState = {
    loading: false,
    loaded: false,
    document: null,
    errorMessage: null
};

export function prevReducer(
  state: States.PrevState = initialPrevState,
  action: Actions.AllPrevs
): States.PrevState {
  switch (action.type) {
      case Actions.prevsTypes.FETCH_PREVS:
          return {
              loading: true,
              loaded: false,
              documents: null,
              errorMessage: null
          };

      case Actions.prevsTypes.FETCH_PREVS_SUCCESS:
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

      case Actions.prevsTypes.FETCH_PREVS_ERROR:
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

export function docReducer(
    state: States.DocState = initialDocState,
    action: Actions.AllDoc
): States.DocState {
    switch (action.type) {
        case Actions.docTypes.FETCH_DOC:
            return {
                loading: true,
                loaded: false,
                document: null,
                errorMessage: null
            };

        case Actions.docTypes.FETCH_DOC_SUCCESS:
            return {
                loading: false,
                loaded: true,
                document: action.payload,
                errorMessage: null
            };

        case Actions.docTypes.FETCH_DOC_ERROR:
            return {
                loading: false,
                loaded: false,
                document: null,
                errorMessage: {
                    type: action.type,
                    error: action.payload
                }
            };

        default:
            return state;
    }
}

export const docModuleReducers = {
    prevs: prevReducer,
    doc: docReducer,
};

export default docModuleReducers;
