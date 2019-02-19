import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { StatusEnum } from '../models/status.enum';
import { AddCommentModel } from '../models/add-comment.model';

const DocCommentsQuery = gql`
query Comments($documentId: String){
  comments(documentId: $documentId) {
    id
    page
    content
    markedText {
      line
      content
    }
    reviewer {
      firstName
      lastName
      role
    }
  }
}
`;

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
  query Document($page: Int!, $status: statusGetDocuments!) {
    documents(page: $page, status: $status) {
      id
      author
      content
      status
      preview
      comments {
        reviewer {
          firstName
          lastName
        }
      }
    }
  }
`;

const AddCommentMutation = gql`
mutation Document($input: addCommentInput!){
  addComment(input: $input) {
    id
    page
    content
    markedText {
      line
      content
    }
    reviewer {
      id
      firstName
      lastName
    }
  }
}
`;

const DeleteCommentMutation = gql`
mutation Document($id: String!){
  deleteComment(id: $id) {
    id
    page
    content
    markedText {
      line
      content
    }
    reviewer {
      id
      firstName
      lastName
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

  fetchDocumentComments(documentId: string): Observable<any> {
    return this.apollo.watchQuery({
      query: DocCommentsQuery,
      variables: {
        documentId: documentId
      },
      fetchPolicy: 'no-cache',
    }).valueChanges;
  }

  fetchPrevs(): Observable<any> {
    return this.apollo.watchQuery({ query: PrevQuery }).valueChanges;
  }

  fetchPrevsByStatus(page: number, status: StatusEnum): Observable<any> {
    return this.apollo.watchQuery({
      query: PrevByStatusQuery,
      variables: {
        page: page,
        status: status
      }
    }).valueChanges;
  }

  addCommentMutation(comment: AddCommentModel): Observable<any> {
    return this.apollo.mutate({
      mutation: AddCommentMutation,
      variables: {
        input: comment
      },
      fetchPolicy: 'no-cache',
    });
  }

  deleteCommentMutation(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: DeleteCommentMutation,
      variables: {
        id: id
      },
      fetchPolicy: 'no-cache',
    });
  }
}
