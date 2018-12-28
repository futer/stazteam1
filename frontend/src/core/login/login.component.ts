import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  loginForm: FormGroup;

  constructor(
    private loginFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.loginForm = this.loginFormBuilder.group({
      email: ['', [Validators.required, Validators.pattern(/^[A-z]+$/)]],
      password: ['', [Validators.required, Validators.minLength(5)]],
  }, {
  });
  }

  onSubmit() {
    console.log('this submit works!');
  }

}
