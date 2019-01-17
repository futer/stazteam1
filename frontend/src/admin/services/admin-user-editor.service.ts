import { Injectable } from '@angular/core';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import {Observable} from 'rxjs';


const AdminUserEditorQuery = gql`
  query AdminUserEditor {
    users {
      id
      firstName
      lastName
      pic
      password
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class AdminUserEditorService {
  adress = environment.adress;

  constructor(
    private apollo: Apollo
  ) { }

  fetchUser(): Observable<any> {
    return this.apollo.watchQuery({query: AdminUserEditorQuery}).valueChanges;
  }
}
