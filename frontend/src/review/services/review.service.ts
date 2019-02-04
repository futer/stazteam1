import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gpl from 'graphql-tag';
import { environment } from '../../environments/environment';

const CommentsQuery = gpl`
  query Comments {
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
        pic
      }
    }
  }
`;

const CommentQuery = gpl`
  query Comments {
    comment($id: $id) {
      id
      start
      length
      page
      content
      reviewer {
        id
        firstName
        lastName
        pic
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

  fetchComments(): Observable<any> {
    return this.apollo.watchQuery({ query: CommentsQuery }).valueChanges;
  }

  fetchComment(id: string) {
    return this.apollo.watchQuery({
      query: CommentQuery,
      variables: {
        id: id
      }
    }).valueChanges;
  }
}
