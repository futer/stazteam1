import { Component, OnInit } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { Observable } from 'rxjs';

import { Store } from '@ngrx/store';

import { DocState } from '../store/document.states';
import { Fetch } from '../store/document.actions';


@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit {
  prevs$: Observable<DocumentModel[]>;

  constructor(
    private store: Store<DocState>
  ) { }

  ngOnInit() {
    this.store.dispatch(new Fetch());

    this.prevs$ = this.store.select((docs: DocState) => docs.docState);
  }
}
