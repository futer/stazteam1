import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const PrevQuery = gql`
  query Documents {
    documents{
      id
      title
      author
      date
      preview
    }
  }
`;

const DocQuery = gql`
  query Document($id: String!){
    document(id:$id){
      title
      author
      date
      content
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class DocumentService {
  adress = environment.adress;

  constructor(
    private apollo: Apollo
  ) { }

  fetchPrevs(): Observable<any> {
    return this.apollo.watchQuery({query: PrevQuery}).valueChanges;
  }

  fetchDocument(id): Observable<any> {
    console.log(id);
    return this.apollo.watchQuery({
      query: DocQuery,
      variables: {
        id: id
      }
    }).valueChanges;
  }
}
