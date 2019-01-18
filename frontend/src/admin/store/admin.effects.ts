import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { of } from 'rxjs';
import { map, switchMap, catchError } from 'rxjs/operators';
import { AdminUserEditorService } from '../services/admin-user-editor.service';
import * as userActions from './admin.actions';
import { UserModel, UserWithoutPass } from '../models/user.model';
import { ErrorData } from '../models/error.model';


@Injectable()
export class UserEffects {
    constructor(
        private actions$: Actions,
        private adminUserEditorService: AdminUserEditorService,
    ) {}

    @Effect()
    Fetch$: Observable<any> = this.actions$
        .ofType(userActions.userTypes.FETCH)
        .pipe(
            switchMap(() =>
                this.adminUserEditorService.fetchUser().pipe(
                    map((users: UserModel) => new userActions.FetchSuccess(users)),
                    catchError((error: ErrorData) => of(new userActions.FetchError(error)))
                )
            )
        );

    @Effect()
    Send$: Observable<any> = this.actions$
        .ofType(userActions.userTypes.SEND)
        .pipe(
            switchMap(() =>
                this.adminUserEditorService.sendUser().pipe(
                    map((user: UserWithoutPass) => new userActions.SendSuccess(user)),
                    catchError((error: ErrorData) => of(new userActions.FetchError(error)))
                )
            )
        );
}
