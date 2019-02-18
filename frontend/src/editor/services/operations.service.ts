import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';
import { UserSendDataModel } from '../models/usersend.model';
import { AlertModel } from '../models/alert.model';

const addDocMutation = gql`
mutation AddDocument(
  $author: String!
  $content: String!
  $preview: String!
  $title: String!
  $userId: String!
  ) {
  addDocument(
    author: $author
    content: $content
    preview: $preview
    title: $title
    userId: $userId
  ) {
    id
  }
}
`;

@Injectable({
  providedIn: 'root'
})
export class OperationsService {
  adress = environment.adress;
  private sendStatus = new Subject<AlertModel>();
  observeStatus$ = this.sendStatus.asObservable();

  constructor(
    private apollo: Apollo
  ) { }

  sendToReview(data: UserSendDataModel) {
    this.apollo.mutate({
      mutation: addDocMutation,
      variables: {
        author: data.author,
        content: data.content,
        preview: data.preview,
        title: data.title,
        userId: data.userId
      }
    }).toPromise()
      .then(res => this.sendStatus.next(<AlertModel>{
        type: 'success',
        message: 'Your Doc ID: ' + res['data'].addDocument.id
      }))
      .catch(err => this.sendStatus.next(<AlertModel>{
        type: 'error',
        message: 'An error occured...'
      }));
  }
}
