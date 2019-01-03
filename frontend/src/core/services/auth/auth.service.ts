import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
    return this.http.post(this.adress + 'users/authenticate', data);
  }

  loginNavigate() {
    this.router.navigate(['/login']);
  }

  mainNavigate() {
    this.router.navigate(['/main']);
  }
}
