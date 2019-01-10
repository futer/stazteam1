import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatcher } from '../../shared/reusable-functions/passwordMatcher';
import { Router } from '@angular/router';
import { RegisterModel } from '../../app/models/register.model';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

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

pictureUrl;
user: RegisterModel;
error: HttpErrorResponse;

  constructor(
    private registerFormBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
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
      picture: '',
    });

  }

  pictureUpload(event) {
    this.pictureUrl = event.target.files[0];
    console.log(this.pictureUrl);
    const reader = new FileReader;
    reader.onload = () => {
      this.pictureUrl = reader.result;
    };
    reader.readAsDataURL(this.pictureUrl);

  }

  navigate(): void {
    this.router.navigate(['login']);
  }

  register(form): void {
    this.authService.createUser(form.value).subscribe(data => {
      this.authService.loginNavigate();
      console.log(data);
    },
    err => {
      console.log(err);
      this.error = err;
    }
    );
  }

}
