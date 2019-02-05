import * as States from './document.states';
import * as Actions from './document.actions';

export const initialPrevState: States.PrevState = {
    loading: false,
    loaded: false,
    previews: [],
    errorMessage: null
};

export const initialLikedState: States.LikedState = {
    loading: false,
    loaded: false,
    previews: [],
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
                ...state,
                loading: true,
                loaded: false,
            };

        case Actions.prevsTypes.FETCH_PREVS_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                previews: [...state.previews, ...action.payload.data.documents],
                errorMessage: null
            };

        case Actions.prevsTypes.FETCH_PREVS_ERROR:
            return {
                loading: false,
                loaded: false,
                previews: null,
                errorMessage: {
                    type: action.type,
                    error: action.payload
                }
            };

        default:
            return state;
    }
}

export function likedReducer(
    state: States.LikedState = initialLikedState,
    action: Actions.AllLiked
): States.LikedState {
    switch (action.type) {
        case Actions.likedTypes.FETCH_LIKED:
            return {
                ...state,
                loading: true,
                loaded: false,
            };

        case Actions.likedTypes.FETCH_LIKED_SUCCESS:
            return {
                ...state,
                loading: false,
                loaded: true,
                previews: [...state.previews, ...action.payload.data.likes.docs],
                errorMessage: null
            };

        case Actions.likedTypes.FETCH_LIKED_ERROR:
            return {
                loading: false,
                loaded: false,
                previews: null,
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

        case Actions.docTypes.ADD_LIKE_SUCCESS:
            return {
                ...state,
                document: {
                    data: {
                        document: state.document.data.document,
                        like: action.payload
                    }
                },
            };

        case Actions.docTypes.ADD_LIKE_ERROR:
            return {
                ...state,
                errorMessage: {
                    type: action.type,
                    error: action.payload
                }
            };

        case Actions.docTypes.DELETE_LIKE_SUCCESS:
            return {
                ...state,
                document: {
                    data: {
                        document: state.document.data.document,
                        like: action.payload
                    }
                },
            };

        case Actions.docTypes.DELETE_LIKE_ERROR:
            return {
                ...state,
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
    liked: likedReducer,
    doc: docReducer
};

export default docModuleReducers;
