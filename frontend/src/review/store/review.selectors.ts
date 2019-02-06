import * as States from './review.states';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusEnum } from '../models/status.enum';
import { DocumentsModel, DocModel } from '../models/document.model';

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
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.ACCEPTED, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getAcceptedPrevsLength = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.ACCEPTED, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
  }
);

export const getPendingPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.PENDING, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getPendingPrevsLength = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.PENDING, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
  }
);

export const getRejectedPrevs = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.REJECTED, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getRejectedPrevsLength = createSelector(
  docFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.REJECTED, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
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

function filterByStatus(status: StatusEnum, array: DocModel[]) {
  return array.filter(
    prev => prev.status === status
  );
}
