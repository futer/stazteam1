import * as States from './review.states';

import { createSelector, createFeatureSelector } from '@ngrx/store';

export const docFeature = createFeatureSelector<States.ReviewModuleState>('review');

export const arePrevsLoading = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.prevs.loading
);

export const arePrevsLoaded = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.prevs.loaded
);

export const getPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.prevs.previews
);

export const getPrevsError = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.prevs.errorMessage
);

export const isDocLoading = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.doc.loading
);

export const isDocLoaded = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.doc.loaded
);

export const getDoc = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.doc.document
);

export const getDocError = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => state.doc.errorMessage
);
