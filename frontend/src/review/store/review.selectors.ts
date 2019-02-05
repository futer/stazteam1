import * as States from './review.states';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusEnum } from '../models/status.enum';

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

export const getAcceptedPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    if (state.prevs.previews) {
      state.prevs.previews.data.documents = state.prevs.previews.data.documents.filter(
        prev => prev.status === StatusEnum.ACCEPTED
      );
    }

    return state.prevs.previews;
  }
);

export const getPendingPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    if (state.prevs.previews) {
      state.prevs.previews.data.documents = state.prevs.previews.data.documents.filter(
        prev => prev.status === StatusEnum.PENDING
      );
    }

    return state.prevs.previews;
  }
);

export const getRejectedPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    if (state.prevs.previews) {
      state.prevs.previews.data.documents = state.prevs.previews.data.documents.filter(
        prev => prev.status === StatusEnum.REJECTED
      );
    }

    return state.prevs.previews;
  }
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
