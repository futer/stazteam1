import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

import { JWT } from '../models/jwt.model';
import { HttpErrorResponse } from '@angular/common/http';
import { NavService } from '../services/nav/nav.service';
import { LoginModel } from 'src/app/models/login.model';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.state';
import { LogIn } from '../store/auth.actions';
import * as loginAuthReducer from '../store/auth.reducers';



@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;
  error: HttpErrorResponse;
  user: LoginModel;


  constructor(
    private loginFormBuilder: FormBuilder,
    private auth: AuthService,
    private navSerice: NavService,
    private store: Store<AuthState>

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
  }
