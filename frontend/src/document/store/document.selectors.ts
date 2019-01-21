import * as States from './document.states';

import { createSelector, createFeatureSelector } from '@ngrx/store';

export const docFeature = createFeatureSelector<States.DocModuleState>('docModule');

export const arePrevsLoading = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.prevs.loading
);

export const arePrevsLoaded = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.prevs.loaded
);

export const getPrevs = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.prevs.documents
);

export const getPrevsError = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.prevs.errorMessage
);

export const isDocLoading = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.doc.loading
);

export const isDocLoaded = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.doc.loaded
);

export const getDoc = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.doc.document
);

export const getDocError = createSelector(
    docFeature,
    (state: States.DocModuleState) => state.doc.errorMessage
);
