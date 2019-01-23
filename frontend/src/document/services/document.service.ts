import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';

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
  adress = environment.adress;

  constructor(
    private apollo: Apollo
  ) { }

  fetchDocuments(): Observable<any> {
    return this.apollo.watchQuery({query: DocQuery}).valueChanges;
  }
}
