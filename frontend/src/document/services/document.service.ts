import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { DocumentModel } from '../models/document.model';

const DocQuery = gql`
  query Documents {
    Document {
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
  adress = 'http://localhost:5000/';

  constructor(
    private apollo: Apollo
  ) { }

  fetchDocuments(): Observable<any> {
    return this.apollo.watchQuery({query: DocQuery}).valueChanges;
  }
}
