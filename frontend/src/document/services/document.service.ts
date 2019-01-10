import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const DocQuery = gql`
  query Documents {
    documents{
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

  fetchDocuments(): Observable<any> {
    return this.apollo.watchQuery({query: DocQuery}).valueChanges;
  }
}
