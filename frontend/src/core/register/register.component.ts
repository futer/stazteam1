import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {passwordMatcher} from '../../shared/reusable-functions/passwordMatcher';


@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup;

private validationMessages = {
  required: 'The field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be longer then 5 characters',
  matchingPassword: 'Password doesnt match',
};

  constructor(
    private registerFormBuilder: FormBuilder,
  ) { }

  ngOnInit() {
    this.registerForm = this.registerFormBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.registerFormBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', Validators.required]
      }, {validator: passwordMatcher}),
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
    });

  }


}
