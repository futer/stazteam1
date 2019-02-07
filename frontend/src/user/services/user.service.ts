import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';

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

  constructor(
    private apollo: Apollo,
    private store: Store<any>,
    private http: HttpClient,
  ) { }

  sendUser(user): Observable<any> {
    return this.apollo.mutate({mutation: UserEditorMutation, variables: {us: user.payload}});
  }

  disconnect(id, password): Observable<Object> {
    console.log('tujestem');
    return this.http.post(this.adress + 'users/disconnect', {
      id: id,
      password: password
    });
  }
}

