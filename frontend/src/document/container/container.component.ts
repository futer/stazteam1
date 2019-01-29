import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { State } from '../store/document.states';
import * as Actions from '../store/document.actions';
import { DocumentService } from '../services/document.service';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  prevs$: Observable<DocumentModel[]>;

  constructor(
    private store: Store<State>,

  ) { }

  ngOnInit() {
    this.store.dispatch(new Actions.Fetch);

    this.prevs$ = this.store.select((docs: State) => docs.documents);
  }
}
