import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth/auth.service';

import { JWT } from '../models/jwt.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginFormBuilder: FormBuilder,
    private auth: AuthService,
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
      console.log(false);
      return;
    }
    this.auth.login(this.loginForm.value).subscribe(
      (res: JWT) => {
        this.auth.setToken(res.token);
        this.auth.mainNavigate();
      },
      err => {
        console.log(err);
      });
   }

}
