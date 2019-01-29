import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

const PrevQuery = gql`
  query Documents {
    documents{
      id
      author
      date
      preview
      title
    }
  }
`;

const DocQuery = gql`
  query Document($id: String!){
    document(id:$id){
      author
      content
      date
      title
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
