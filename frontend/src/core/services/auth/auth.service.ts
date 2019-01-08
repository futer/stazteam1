import { Injectable } from '@angular/core';
import { RegisterModel } from '../../../app/models/register.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})

export class AuthService {


  adress = environment.adress;
  jwtHelper: JwtHelperService;


  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  createUser(user: RegisterModel) {
    const data = {...user, ...user.passwordGroup};
    delete data.passwordGroup;
    delete data.repeatPassword;

    return this.http.post<RegisterModel>(this.adress + 'users/register', data)
     .pipe(catchError(this.errorHandler));
  }

  isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(JWtoken) {
    localStorage.setItem('token', JWtoken);
  }

  login(data): Observable<Object> {
    return this.http.post(this.adress + 'users/authenticate', data);
  }

  loginNavigate() {
    this.router.navigate(['/login']);
  }

  mainNavigate() {
    this.router.navigate(['/main']);
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }
}
