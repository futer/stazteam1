import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

import { JWT } from '../models/jwt.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavService } from '../services/nav/nav.service';
import { LoginModel } from 'src/app/models/login.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { LogIn, SocialLogIn } from '../store/auth/auth.actions';
import * as loginAuthReducer from '../store/auth/auth.reducers';

import { AuthService as SocialMediaAuthService, SocialUser } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider, LinkedInLoginProvider } from 'angularx-social-login';
import { Observable, Subscription } from 'rxjs';
import { getLoginAuth } from '../store/auth/auth.reducers';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  user: LoginModel;
  error$: Observable<any> = this.store.select(loginAuthReducer.Erros);
  private socialUser: SocialUser;
  private loggedIn: boolean;
  loggedInSub: Subscription;

  constructor(
    private loginFormBuilder: FormBuilder,
    private auth: AuthService,
    private navSerice: NavService,
    private store: Store<AuthState>,
    private socialMediaAuthService: SocialMediaAuthService
  ) { }

  ngOnInit() {
    this.loginForm = this.loginFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      }, {
    });
  }

  onSubmit() {
    if (this.loginForm.invalid) {
      return;
    }
      const payload = {
        email: this.loginForm.value.email,
        password: this.loginForm.value.password
      };
      this.store.dispatch(new LogIn(payload));
    }

    signInWithGoogle(): void {
      this.socialMediaAuthService.signIn(GoogleLoginProvider.PROVIDER_ID);
    }

    signInWithFB(): void {
      this.socialMediaAuthService.signIn(FacebookLoginProvider.PROVIDER_ID);
      this.loggedInSub = this.socialMediaAuthService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        if (this.loggedIn) {
          this.store.dispatch(new SocialLogIn(this.user));
        }
      });
    }
}
