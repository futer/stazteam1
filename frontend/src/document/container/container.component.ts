import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../store/document.states';
import * as Actions from '../store/document.actions';
import { getDocs, getErrors, isLoaded } from '../store/document.reducers';
import { ErrorData } from '../models/error.model';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  prevs$: Observable<DocumentModel>;
  errorHandler$: Observable<ErrorData>;
  checkLoad: Subscription;

  constructor(
    private store: Store<State>
  ) { }

  ngOnInit() {
    this.checkLoad = this.store.select(isLoaded).subscribe(load => {
      if (!load) {
        this.store.dispatch(new Actions.FetchPrevs);
      }

      this.prevs$ = this.store.select(getDocs);
      this.errorHandler$ = this.store.select(getErrors);
    });
  }

  ngOnDestroy() {
    this.checkLoad.unsubscribe();
  }
}
