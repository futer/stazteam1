import { Injectable } from '@angular/core';
import { Action } from '@ngrx/store';
import { Router } from '@angular/router';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { DocumentService } from '../services/document.service';
import { docTypes } from './document.actions';


@Injectable()
export class DocumentEffects {

  constructor(
    private actions: Actions,
    // private documentService: DocumentService,
    // private router: Router,
  ) {}

  @Effect()
    Fetch: Observable<any> = this.actions
    .ofType(docTypes.FETCH);
}


