import { Component, OnInit } from '@angular/core';
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



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: HttpErrorResponse;
  user: LoginModel;
  private socialUser: SocialUser;
  private loggedIn: boolean;


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
    // if (this.loginForm.invalid) {
    //   console.log(false);
    //   return;
    // }
    // this.auth.login(this.loginForm.value).subscribe(
    //   (res: JWT) => {
    //     this.auth.setToken(res.token);
    //     this.auth.mainNavigate();
    //   },
    //   err => {
    //     console.log(err);
    //     this.error = err;
    //   });
    //   this.user = this.loginForm.value;
    //   console.log(this.user);

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
      this.socialMediaAuthService.authState.subscribe((user) => {
        this.user = user;
        this.loggedIn = (user != null);
        console.log(this.loggedIn);
        if (this.loggedIn) {
          console.log('signWithFB', this.user);
          this.store.dispatch(new SocialLogIn(this.user));
        }
      });

    }

    signOut(): void {
      this.socialMediaAuthService.signOut();
    }
  }
