import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';

import * as userActions from './user.actions';
import { UserModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';
import { UserService } from '../services/user.service';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private userService: UserService,
    ) {}

    @Effect()
    Fetch$: Observable<any> = this.actions$
        .ofType(userActions.userTypes.FETCH)
        .pipe(
            switchMap(() =>
                this.userService.fetchUser().pipe(
                    map((user: UserModel) => new userActions.FetchSuccess(user)),
                    catchError((error: ErrorData) => of(new userActions.FetchError(error)))
                )
            )
        );
}
