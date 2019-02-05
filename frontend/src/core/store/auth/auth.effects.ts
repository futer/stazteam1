import { Injectable } from '@angular/core';
import { Actions, Effect } from '@ngrx/effects';
import { AuthService } from '../../services/auth/auth.service';
import * as AuthActions from './auth.actions';
import { Observable, of } from 'rxjs';
import { map, switchMap, catchError, tap } from 'rxjs/operators';
import { LoginModel, LoginModel2 } from 'src/app/models/login.model';
import { UserModel } from 'src/app/models/user.model';
import { ErrorData } from 'src/document/models/error.model';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { tokenKey } from '@angular/core/src/view';
import { JwtModule, JwtHelperService } from '@auth0/angular-jwt';


@Injectable()
    export class AuthEffect {
        constructor(
            private actions$: Actions,
            private authService: AuthService,
            private router: Router,
            ) {}

            @Effect()
            LogIn$: Observable<any> = this.actions$
                .ofType(AuthActions.AuthActionTypes.LOGIN)
                .pipe(
                    switchMap((payload) =>
                        this.authService.login(payload).pipe(
                            map((user: LoginModel) => {
                                this.authService.setToken(user.token);
                                this.router.navigate(['/main']);
                                let u: UserModel;
                                u = this.authService.decode(user.token).sub;
                                u.pic = user.pic;
                                return new AuthActions.LogInSucces(u);
                            }),
                            catchError((error: ErrorData) => of(new AuthActions.LogInFail(error)))
                        )
                    )
            );

            @Effect()
            SocialLogIn$: Observable<any> = this.actions$
                .ofType(AuthActions.AuthActionTypes.SOCIAL_LOGIN)
                .pipe(
                    switchMap((payload) =>
                        this.authService.socialLogin(payload).pipe(
                            map((user: LoginModel2) => {
                                console.log(user);
                                this.authService.setToken(user.token);
                                this.router.navigate(['/main']);
                                let u: UserModel;
                                u = this.authService.decode(user.token).sub;
                                u.pic = user.pic;
                                return new AuthActions.LogInSucces(u);
                            }),
                            catchError((error: ErrorData) => of(new AuthActions.LogInFail(error)))
                        )
                    )
            );


            @Effect()
            Reload$: Observable<any> = this.actions$
                .ofType(AuthActions.AuthActionTypes.RELOAD)
                .pipe(
                    switchMap(() =>
                        this.authService.reload().pipe(
                            map((user: UserModel) => {
                                return new AuthActions.ReloadSuccess(user);
                            }),
                            catchError((error: ErrorData) => of(new AuthActions.ReloadFail(error)))
                        )
                    )
                );



            @Effect({dispatch: false})
            Logout$: Observable<any> = this.actions$
            .ofType(AuthActions.AuthActionTypes.LOGOUT).pipe(
                tap(() => {
                    this.authService.removeToken();
                    this.router.navigate(['/login']);
                })
            );
    }
