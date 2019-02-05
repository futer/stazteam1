import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../models/status.enum';

import { Store } from '@ngrx/store';
import { DocState } from '../store/review.states';
import * as Actions from '../store/review.actions';
import * as Selectors from '../store/review.selectors';
import { ReviewService } from '../services/review.service';
import { ReviewModuleState } from '../store/review.states';
import { DocumentsModel } from '../models/document.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  prevs: DocumentsModel;
  prevsSub: Subscription;

  private acceptedPrevsLength: number;
  private pendingPrevsLength: number;
  private rejectedPrevsLength: number;

  constructor(
    private store: Store<any>,
  ) {
    this.store.dispatch(new Actions.FetchPendingPrevs);

    // this.store.select(a => a).subscribe(b => console.log(b));

    this.prevsSub = this.store.select(Selectors.getAcceptedPrevs).subscribe(prevs => {
      if (prevs) {
        this.prevs = prevs;
        this.tmp();

        console.log(this.prevs);
      }
    }
    );
  }

  ngOnInit() {
  }

  clickedTab(clicked: StatusEnum) {
    this.prevsSub.unsubscribe();
    switch (clicked) {
      case StatusEnum.ACCEPTED:
        this.store.dispatch(new Actions.FetchAcceptedPrevs);
        this.prevsSub = this.store.select(Selectors.getAcceptedPrevs).subscribe(prevs => {
          if (prevs) { this.prevs = prevs; this.tmp(); }
        });
        break;
      case StatusEnum.PENDING:
        this.store.dispatch(new Actions.FetchPendingPrevs);
        this.prevsSub = this.store.select(Selectors.getPendingPrevs).subscribe(prevs => {
          if (prevs) { this.prevs = prevs; this.tmp(); }
        });
        break;
      case StatusEnum.REJECTED:
        this.store.dispatch(new Actions.FetchRejectedPrevs);
        this.prevsSub = this.store.select(Selectors.getRejectedPrevs).subscribe(prevs => {
          if (prevs) { this.prevs = prevs; this.tmp(); }
        });
        break;
    }

  }

  tmp() {
    this.acceptedPrevsLength = 0;
    this.pendingPrevsLength = 0;
    this.rejectedPrevsLength = 0;

    this.prevs.data.documents.forEach(prev => {
      switch (prev.status) {
        case StatusEnum.ACCEPTED:
          this.acceptedPrevsLength++;
          break;
        case StatusEnum.PENDING:
          this.pendingPrevsLength++;
          break;
        case StatusEnum.REJECTED:
          this.rejectedPrevsLength++;
          break;
      }
    });

    console.log('accepted: ', this.acceptedPrevsLength);
    console.log('pending: ', this.pendingPrevsLength);
    console.log('rejected: ', this.rejectedPrevsLength);
  }
}
