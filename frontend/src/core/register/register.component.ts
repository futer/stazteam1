import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators
} from '@angular/forms';
import { passwordMatcher } from '../../shared/reusable-functions/passwordMatcher';
import { Router } from '@angular/router';
import { RegisterModel } from '../../app/models/register.model';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavService } from '../services/nav/nav.service';
import { DomSanitizer } from '@angular/platform-browser';
import * as pictureUploadFunctions from '../../shared/reusable-functions/pictureUpload';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  private registerForm: FormGroup;

private validationMessages = {
  required: 'The field is required',
  email: 'Please enter a valid email address',
  password: 'Password must be longer then 5 characters',
  matchingPassword: 'Password doesnt match',
};

  private picture;
  private user: RegisterModel;
  private error: HttpErrorResponse;

  constructor(
    private registerFormBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private navService: NavService,
    private sanitizer: DomSanitizer
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
      pic: '',
    });
    this.navService.hide();
  }

  pictureUpload(event) {
    pictureUploadFunctions.pictureUpload(event).then(pic => {
      if (pic) {
        this.picture = pic;
      } else {
        window.alert('This image is too big');
      }
    });
  }

  getPic() {
    return pictureUploadFunctions.getPic(this.picture, this.sanitizer);
  }

  navigate(): void {
    this.router.navigate(['login']);
  }

  register(form): void {
    this.authService.createUser(form.value, this.picture).subscribe(data => {
    this.authService.loginNavigate();
    }, err => {
      this.error = err;
      }
    );
  }
}
