import * as docState from './document.states';
import * as docActions from './document.actions';

export const initialState: docState.State = {
    loading: false,
    loaded: false,
    documents: null,
    errorMessage: null
};

export function Reducer (
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
      loading: true,
      loaded: false,
      documents: action.payload,
      errorMessage: null
    };

    case docActions.docTypes.FETCH_ERROR:

    return {
      loading: false,
      loaded: false,
      documents: null,
      errorMessage: action.payload
    };

    default:
      return state;
  }
}
