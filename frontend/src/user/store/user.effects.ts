import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable, of } from 'rxjs';
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
    Send$: Observable<any> = this.actions$
        .ofType(userActions.currentTypes.SEND)
        .pipe(
            switchMap((payload) =>
                this.userService.sendUser(payload).pipe(
                    map((user: UserModel) => new userActions.SendSuccess(user)),
                    catchError((error: ErrorData) => of(new userActions.SendError(error)))
                )
            )
        );
}
