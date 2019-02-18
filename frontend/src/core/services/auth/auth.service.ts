import { Injectable } from '@angular/core';
import { RegisterModel } from '../../../app/models/register.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { RoleEnum } from 'src/app/models/role.enum';
import { UserModel } from 'src/app/models/user.model';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private adress = environment.adress;
  private jwtHelper: JwtHelperService;

  constructor(
    private http: HttpClient,
    private router: Router,
  ) {
    this.jwtHelper = new JwtHelperService();
  }

  createUser(user: RegisterModel, pic: string) {
    const data = {...user, ...user.passwordGroup};
    delete data.passwordGroup;
    delete data.repeatPassword;
    data.pic = pic;

    return this.http.post<RegisterModel>(this.adress + 'users/register', data)
     .pipe(catchError(this.errorHandler));
  }

  isAuthenticated(): boolean {
    const token = this.getToken();
    // Check whether the token is expired and return
    // true or false
    return !this.jwtHelper.isTokenExpired(token);
  }

  authorize(incomingRole: RoleEnum): boolean {
    const token = this.getToken();
    const role = (this.jwtHelper.decodeToken(token)).sub.role;

    return role === incomingRole || role === RoleEnum.ADMIN;
  }

  isAdmin(): boolean {
    return this.authorize(RoleEnum.ADMIN);
  }

  isEditor(): boolean {
    return this.authorize(RoleEnum.EDITOR);
  }

  setToken(JWtoken): void {
    localStorage.setItem('token', JWtoken);
  }

  getToken(): string {
    return localStorage.getItem('token');
  }

  removeToken(): void {
    localStorage.removeItem('token');
  }

  login(payload: any): Observable<Object> {
    return this.http.post(this.adress + 'users/authenticate', {
      email: payload.payload.email,
      password: payload.payload.password,
    });
  }

  socialLogin(payload: any): Observable<Object> {
    return this.http.post(this.adress + 'users/socialAuthenticate', { payload });
  }

  reload(): Observable<Object> {
      return this.http.get(this.adress + 'users/getCurrentUser', { headers: {
        'Authorization': 'Bearer ' + this.getToken()
      }});
  }

  loginNavigate(): void {
    this.router.navigate(['/login']);
  }

  mainNavigate(): void {
    this.router.navigate(['/main']);
  }

  errorHandler(error: HttpErrorResponse): Observable<never> {
    return throwError(error);
  }

  decode(token: string): UserModel {
    return this.jwtHelper.decodeToken(token);
  }
}
