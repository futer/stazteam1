import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const DocQuery = gql`
  query Documents {
    documents{
      id
      title
      author
      date
      content
      preview
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
