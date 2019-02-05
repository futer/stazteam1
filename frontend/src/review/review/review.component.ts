import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../models/status.enum';

import { Store } from '@ngrx/store';
import { DocState } from '../store/review.states';
import * as Actions from '../store/review.actions';
import * as Selectors from '../store/review.selectors';
import { ReviewService } from '../services/review.service';
import { ReviewModuleState } from '../store/review.states';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  message: string;

  constructor(
    private store: Store<any>,
  ) {
    this.message = '';
    this.store.dispatch(new Actions.FetchPrevsByStatus(StatusEnum.REJECTED));
  }

  ngOnInit() {
  }

  clickedTab(clicked: StatusEnum) {
    this.message = clicked;

    this.store.select(Selectors.getPrevs).subscribe(a => console.log(a));

    console.log(this.message);
  }
}
