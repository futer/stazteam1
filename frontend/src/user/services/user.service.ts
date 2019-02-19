import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { AuthService as SocialMediaAuthService, SocialUser } from 'angularx-social-login';
import { AuthService } from 'src/core/services/auth/auth.service';

const UserEditorMutation = gql`
  mutation EditUser ($us: userInput!) {
    updateUser (user: $us){
        id
        firstName
        lastName
        pic
      }
    }
`;

@Injectable({
  providedIn: 'root'
})

export class UserService {
  adress = environment.adress;
  user: SocialUser;

  constructor(
    private apollo: Apollo,
    private http: HttpClient,
    private socialMediaAuthService: SocialMediaAuthService,
    private authService: AuthService
  ) { }

  sendUser(user): Observable<any> {
    return this.apollo.mutate({mutation: UserEditorMutation, variables: { us: user.payload }});
  }

  disconnect(id, password): Observable<Object> {
    this.socialMediaAuthService.authState.subscribe(user => {
      this.user = user;
    });

    if (this.user) {
      return this.http.post(this.adress + 'users/disconnect', {
        id: id,
        password: password,
        user: this.user
      }, { headers: {
        'Authorization': 'Bearer ' + this.authService.getToken()
      }});
    }
  }

  disconnect_delete(id): Observable<Object> {
    this.socialMediaAuthService.authState.subscribe(user => {
      this.user = user;
    });

    if (this.user) {
      return this.http.post(this.adress + 'users/disconnect_delete', {
        id: id,
        user: this.user
      }, { headers: {
        'Authorization': 'Bearer ' + this.authService.getToken()
      }});
    }
  }

  disconnect_local(): Observable<Object> {
    this.socialMediaAuthService.authState.subscribe(user => {
      this.user = user;
    });

    if (this.user) {
      return this.http.post(this.adress + 'users/disconnect_local', {
        user: this.user
      }, { headers: {
        'Authorization': 'Bearer ' + this.authService.getToken()
      }});
    }
  }
}
