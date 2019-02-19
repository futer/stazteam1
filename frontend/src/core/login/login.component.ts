import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { LoginModel } from 'src/app/models/login.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth/auth.state';
import { LogIn, SocialLogIn } from '../store/auth/auth.actions';
import * as loginAuthReducer from '../store/auth/auth.reducers';
import { AuthService as SocialMediaAuthService } from 'angularx-social-login';
import { FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { Observable, Subscription } from 'rxjs';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  private loginForm: FormGroup;
  private user: LoginModel;
  private loggedIn: boolean;

  private error$: Observable<any> = this.store.select(loginAuthReducer.Erros);
  private loggedInSub: Subscription;

  constructor(
    private loginFormBuilder: FormBuilder,
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
