import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentsModel } from '../models/document.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { PrevState } from '../store/document.states';
import * as Actions from '../store/document.actions';
import { getPrevs, getPrevsError, arePrevsLoaded } from '../store/document.selectors';
import { ErrorData } from '../models/error.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  prevs$: Observable<DocumentsModel>;
  errorHandler$: Observable<ErrorData>;
  checkLoad: Subscription;

  constructor(
    private router: Router,
    private store: Store<PrevState>
  ) { }

  url = this.router.url;

  ngOnInit() {
    if (this.url === '/main') {
      console.log('kutas');
      this.checkLoad = this.store.select(arePrevsLoaded).subscribe(load => {
        if (!load) {
          this.store.dispatch(new Actions.FetchPrevs);
        }

        this.prevs$ = this.store.select(getPrevs);
        this.errorHandler$ = this.store.select(getPrevsError);
      });
    }

    if (this.url === '/main/favourites') {
      console.log('kutas wielki');
      this.checkLoad = this.store.select(arePrevsLoaded).subscribe(load => {
        if (!load) {
          this.store.dispatch(new Actions.FetchPrevs);
        }

        this.prevs$ = this.store.select(getPrevs);
        this.errorHandler$ = this.store.select(getPrevsError);
      });
    }
  }

  ngOnDestroy() {
    this.checkLoad.unsubscribe();
  }
}
