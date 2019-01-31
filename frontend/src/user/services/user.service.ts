import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import {Observable} from 'rxjs';
import { Store } from '@ngrx/store';

const UserEditor = gql`
  query UserEditor {
      id
      firstName
      lastName
      pic
  }
`;
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

  constructor(
    private apollo: Apollo,
    private store: Store<any>
  ) { }


  sendUser(user): Observable<any> {
    console.log('USER>', user.payload);
    return this.apollo.mutate({mutation: UserEditorMutation, variables: {us: user.payload}});
  }
}

