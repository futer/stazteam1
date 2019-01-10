import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/map';
import { LogIn } from './auth.actions';
import { map } from 'rxjs-compat/operator/map';

@Injectable()
    export class AuthEffect {
        constructor(
            private actions$: Actions,
            private authService: AuthService) {}

    @Effect()
    Login$: Observable<any> = this.actions$
            .ofType(AuthActions.AuthActionTypes.LOGIN)
            .map((action: LogIn) => {
                console.log('piekna');
                return action.payload;
            })
            .switchMap((payload) => {
                console.log(payload);
                return this.authService.login(payload.email, payload.password)
                .map((user) => {
                    console.log(user);
                    return new AuthActions.LogInSucces({token: user['token'], email: payload.email});
                },
                err => {
                    console.log(err);
                    return new AuthActions.LogInFail(err);
                });
            });
    }


