import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { LogIn } from './auth.actions';
import { LoginModel } from 'src/app/models/login.model';
import { ErrorData } from 'src/document/models/error.model';
import { Router } from '@angular/router';


@Injectable()
    export class AuthEffect {
        constructor(
            private actions$: Actions,
            private authService: AuthService,
            private router: Router) {}

            @Effect()
            LogIn$: Observable<any> = this.actions$
                .ofType(AuthActions.AuthActionTypes.LOGIN)
                .pipe(
                    switchMap((payload) =>
                        this.authService.login(payload).pipe(
                            map((user: LoginModel) => {
                                this.authService.setToken(user.token);
                                this.router.navigate(['/members']);
                                return new AuthActions.LogInSucces(user);
                            }),
                            catchError((error: ErrorData) => of(new AuthActions.LogInFail(error)))
                        )
                    )
            );

            @Effect({dispatch: false})
            Logout$: Observable<any> = this.actions$
            .ofType(AuthActions.AuthActionTypes.LOGOUT).pipe(
                tap(() => {
                    this.router.navigate(['/login']);
                    localStorage.removeItem('token');
                })
            );
    }
