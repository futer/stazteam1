import { Injectable } from '@angular/core';
import { UserEditorCredentialsModel, UserEditorPictureModel,
  UserEditorPasswordModel, UserInfoModel } from '../../app/models/user-editor.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { catchError } from 'rxjs/operators';
import { throwError, Observable } from 'rxjs';
import gql from 'graphql-tag';
import { UserModel } from '../models/user.model';

const currentUserQuery = gql`
  query currentUser {
      firstName
      lastName
      pic
  }
`;

@Injectable({
  providedIn: 'root'
})
export class UserService {
  adress = environment.adress;
  apollo: any;
  constructor(
    private http: HttpClient,
  ) { }

  changePassword(password: UserEditorPasswordModel) {
    return this.http.post(this.adress + 'users/changePassword', password.passwordGroup.password)
     .pipe(catchError(this.errorHandler));
  }

  changePic(pic: UserEditorPictureModel) {
    console.log(pic);
    return this.http.post(this.adress + 'users/changePic', pic.pic)
     .pipe(catchError(this.errorHandler));
  }

  changeCredentials(credits) {
    return this.http.post(this.adress + 'users/changePic', credits.value)
     .pipe(catchError(this.errorHandler));
  }

  errorHandler(error: HttpErrorResponse) {
    return throwError(error);
  }

  fetchUser(): Observable<UserModel> {
    return this.apollo.watchQuery({query: currentUserQuery}).valueChanges;
  }
}
