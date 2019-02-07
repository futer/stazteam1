import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { passwordMatcher } from '../../shared/reusable-functions/passwordMatcher';
import { Router } from '@angular/router';
import { RegisterModel } from '../../app/models/register.model';
import { AuthService } from '../services/auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { NavService } from '../services/nav/nav.service';
import { DomSanitizer } from '@angular/platform-browser';

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

picture;
user: RegisterModel;
error: HttpErrorResponse;

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
    this.picture = event.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(this.picture);
    reader.onload = () => {
      this.picture = reader.result.toString().split(',')[1];
      if (this.picture.length <= 106000) {
        this.registerForm.get('pic').setValue(this.picture);
      } else {
        this.picture = null;
        window.alert('This image is too big');
      }
    };
  }

  navigate(): void {
    this.router.navigate(['login']);
  }

  register(form): void {
    this.authService.createUser(form.value).subscribe(data => {
    this.authService.loginNavigate();
    },
    err => {
      this.error = err;
    }
    );
  }

  getPic() {
    if (this.picture) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${this.picture}`);
    }
    return '../../assets/img/avatar.png';
  }
}
