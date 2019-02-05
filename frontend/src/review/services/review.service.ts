import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { StatusEnum } from '../models/status.enum';

const PrevQuery = gql`
  query Documents {
    documents{
      id
      author
      date
      preview
      title
      comments {
        id
        start
        length
        page
        content
        reviewer {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

const PrevByStatusQuery = gql`
  query Document($status: statusGetDocuments!) {
    documentsByStatus(status: $status) {
      id
      author
      content
      status
      comments {
        reviewer {
          firstName
          lastName
        }
      }
    }
  }
`;

const DocQuery = gql`
  query Document($id: String!){
    document(id: $id){
      author
      content
      date
      title
      comments {
        id
        start
        length
        page
        content
        reviewer {
          id
          firstName
          lastName
        }
      }
    }
  }
`;

@Injectable({
  providedIn: 'root'
})
export class ReviewService {
  address: string;

  constructor(
    private apollo: Apollo,
  ) {
    this.address = environment.adress;
  }

  fetchPrevs(): Observable<any> {
    return this.apollo.watchQuery({ query: PrevQuery }).valueChanges;
  }

  fetchPrevsByStatus(status: StatusEnum): Observable<any> {
    return this.apollo.watchQuery({
      query: PrevByStatusQuery,
      variables: {
        status: status
      }
    }).valueChanges;
  }

  fetchDoc(id: string): Observable<any> {
    return this.apollo.watchQuery({
      query: DocQuery,
      variables: {
        id: id
      }
    }).valueChanges;
  }
}
