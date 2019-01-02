import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  adress = 'http://localhost:5000/';

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService,
  ) { }

  isAuthenticated(): boolean {

    const token = localStorage.getItem('token');

    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  setToken(JWtoken) {
    localStorage.setItem('token', JWtoken);
  }

  login(data) {
    return this.http.post(this.adress + 'authenticate', data);
  }

  loginNavigate() {
    this.router.navigate(['/login']);
  }
}
