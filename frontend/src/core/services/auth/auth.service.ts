import { Injectable } from '@angular/core';
import { RegisterModel } from '../../../app/models/register.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class AuthService {
  private url = 'http://localhost:5000/users/register';

  constructor(private http: HttpClient) { }

  createUser(user: RegisterModel) {
    const data = {...user, ...user.passwordGroup};
    delete data.passwordGroup;
    delete data.repeatPassword;

    return this.http.post<RegisterModel>(this.url, data);
  }
}
