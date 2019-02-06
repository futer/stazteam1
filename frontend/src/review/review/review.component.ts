import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../models/status.enum';

import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';

import * as Actions from '../store/review.actions';
import * as Selectors from '../store/review.selectors';

import { DocumentsModel } from '../models/document.model';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  static acceptedPrevPage = -1;
  static pendingPrevPage = -1;
  static rejectedPrevPage = -1;

  prevs: Observable<DocumentsModel>;
  prevLoading: Observable<boolean>;

  clickedTab: StatusEnum;

  constructor(
    private store: Store<any>,
  ) {
    this.prevLoading = this.store.select(Selectors.arePrevsLoading);
  }

  ngOnInit() {
  }

  onClickTab(clicked: StatusEnum) {
    this.clickedTab = clicked;
    switch (clicked) {
      case StatusEnum.ACCEPTED:
        this.store.select(Selectors.getAcceptedPrevsLength)
          .subscribe(prevs => {
            if (prevs === 0) {
              this.store.dispatch(new Actions.FetchAcceptedPrevs(++ReviewComponent.acceptedPrevPage));
            }
            this.prevs = this.store.select(Selectors.getAcceptedPrevs);
          }).unsubscribe();
        break;
      case StatusEnum.PENDING:
        this.store.select(Selectors.getPendingPrevsLength)
          .subscribe(prevs => {
            if (prevs === 0) {
              this.store.dispatch(new Actions.FetchPendingPrevs(++ReviewComponent.pendingPrevPage));
            }
            this.prevs = this.store.select(Selectors.getPendingPrevs);
          })
          .unsubscribe();
        break;
      case StatusEnum.REJECTED:
        this.store.select(Selectors.getRejectedPrevsLength)
          .subscribe(prevs => {
            if (prevs === 0) {
              this.store.dispatch(new Actions.FetchRejectedPrevs(++ReviewComponent.rejectedPrevPage));
            }
            this.prevs = this.store.select(Selectors.getRejectedPrevs);
          })
          .unsubscribe();
        break;
    }
  }

  onScrollPrev() {
    switch (this.clickedTab) {
      case StatusEnum.ACCEPTED:
        this.store.dispatch(new Actions.FetchAcceptedPrevs(++ReviewComponent.acceptedPrevPage));
        break;
      case StatusEnum.PENDING:
        this.store.dispatch(new Actions.FetchPendingPrevs(++ReviewComponent.pendingPrevPage));
        break;
      case StatusEnum.REJECTED:
        this.store.dispatch(new Actions.FetchRejectedPrevs(++ReviewComponent.rejectedPrevPage));
        break;
    }
  }
}
