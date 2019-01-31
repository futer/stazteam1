import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {Apollo} from 'apollo-angular';
import gql from 'graphql-tag';
import { environment } from '../../environments/environment';

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

const LikedQuery = gql`
  query Likes {
    likes{
      id
      author
      date
      preview
      title
    }
  }
`;

const CheckLikeQuery = gql`
  query Like($id: String!) {
    like(docs:$id)
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

  fetchLikes(): Observable<any> {
    return this.apollo.watchQuery({query: LikedQuery}).valueChanges;
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

  checkLike(id): Observable<any> {
    console.log(id);
    return this.apollo.watchQuery({
      query: CheckLikeQuery,
      variables: {
        id: id
      }
    }).valueChanges;
  }
}
