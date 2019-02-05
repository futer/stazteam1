import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

const PrevQuery = gql`
  query Documents($page: Int!) {
    documents(page:$page){
      id
      author
      date
      preview
      title
    }
  }
`;

const DocQuery = gql`
  query Document($id: String!) {
    document(id:$id){
      author
      content
      date
      title
    }
    like(docs:$id)
  }
`;

const LikedQuery = gql`
  query Likes($page: Int!) {
    likes(page:$page){
      docs{id
      author
      date
      preview
      title}
    }
  }
`;

const addLikeMutation = gql`
mutation AddLike($id: String!) {
  addLike(
    docs : $id
  ) {
    docs {
      id
    }
  }
}
`;

const deleteLikeMutation = gql`
mutation DeleteLike($id: String!) {
  deleteLike(
    docs : $id
  ) {
    docs {
      id
    }
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

  fetchPrevs(page: number): Observable<any> {
    return this.apollo.watchQuery({
      query: PrevQuery,
      variables: {
        page: page
      }
    }).valueChanges;
  }

  fetchLiked(page: number): Observable<any> {
    return this.apollo.watchQuery({
      query: LikedQuery,
      variables: {
        page: page
      }
    }).valueChanges;
  }

  fetchDocument(id: number): Observable<any> {
    return this.apollo.watchQuery({
      query: DocQuery,
      variables: {
        id: id
      }
    }).valueChanges;
  }

  addLike(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: addLikeMutation,
      variables : {
        id: id
      }
    });
  }

  deleteLike(id: string): Observable<any> {
    return this.apollo.mutate({
      mutation: deleteLikeMutation,
      variables : {
        id: id
      }
    });
  }
}
