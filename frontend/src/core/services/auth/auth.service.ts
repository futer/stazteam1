import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { RegisterModel } from '../../../app/models/register.model';
import { HttpClient } from '@angular/common/http';
=======
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';
>>>>>>> 28648730273a132db1070563baf7c174e05fc166

@Injectable({
  providedIn: 'root'
})

export class AuthService {
<<<<<<< HEAD
  private url = 'http://localhost:5000/users/register';

  constructor(private http: HttpClient) { }

  createUser(user: RegisterModel) {
    const data = {...user, ...user.passwordGroup};
    delete data.passwordGroup;
    delete data.repeatPassword;

    return this.http.post<RegisterModel>(this.url, data);
=======
  adress = 'http://localhost:5000/';

  jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
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
    return this.http.post(this.adress + 'authenticate', data);
  }

  loginNavigate() {
    this.router.navigate(['/login']);
  }

  mainNavigate() {
    this.router.navigate(['/main']);
>>>>>>> 28648730273a132db1070563baf7c174e05fc166
  }
}
