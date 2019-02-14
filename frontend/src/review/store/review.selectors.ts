import * as States from './review.states';

import { createSelector, createFeatureSelector } from '@ngrx/store';
import { StatusEnum } from '../models/status.enum';
import { DocumentsModel, DocModel } from '../models/document.model';

export const reviewFeature = createFeatureSelector<States.ReviewModuleState>('review');

export const getComments = (page: number) => createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    if (state.comments.comments) {
      return state.comments.comments.filter(comment => comment.page === page);
    }
  }
);

export const arePrevsLoading = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => state.prevs.loading
);

export const arePrevsLoaded = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => state.prevs.loaded
);

export const getPrevs = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => state.prevs.previews
);

export const getAcceptedPrevs = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.ACCEPTED, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getAcceptedPrevsLength = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.ACCEPTED, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
  }
);

export const getPendingPrevs = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.PENDING, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getPendingPrevsLength = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.PENDING, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
  }
);

export const getRejectedPrevs = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.REJECTED, state.prevs.previews.data.documents);

    return prevsByStatus;
  }
);

export const getRejectedPrevsLength = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => {
    const prevsByStatus: DocumentsModel = { data: { documents: null } };

    prevsByStatus.data.documents = filterByStatus(StatusEnum.REJECTED, state.prevs.previews.data.documents);

    return prevsByStatus.data.documents.length;
  }
);

export const getPrevsError = createSelector(
  reviewFeature,
  (state: States.ReviewModuleState) => state.prevs.errorMessage
);

function filterByStatus(status: StatusEnum, array: DocModel[]) {
  return array.filter(
    prev => prev.status === status
  );
}
