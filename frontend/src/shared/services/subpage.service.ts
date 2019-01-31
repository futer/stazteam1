import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { ValueTransformer } from '@angular/compiler/src/util';

const updateBookmarkMutation = gql`
mutation updateBookmark($id: String!, $title: String, $content: String, $position: positionUpdateInput){
  updateBookmark(
    id : $id
    title : $title
    content: $content
    position: $position
  ) {
    title
  }
}
`;

const addBookmarkMutation = gql`
mutation addBookmark($title: String!, $position: positionAddInput!, $content: String! ){
  addBookmark(
    title: $title
    position: $position
    content: $content
  ){
    title
    position
    content
    id
  }
}
`;

const deleteBookmarkMutation = gql `
mutation deleteBookmark($id: String!){
  deleteBookmark(
    id: $id
  ){
    title
  }
}
 `;

const BookmarkQuery = gql`
query Bookmarks {
 bookmarks {
  title
  position
  content
  id
 }
}
`;

@Injectable({
  providedIn: 'root'
})
export class SubpageService {

  constructor( private apollo: Apollo ) {
   }

  fetchBookmarks(): Observable<any> {
    return this.apollo.watchQuery({query: BookmarkQuery}).valueChanges;
  }


  update(values): Observable<any> {
    console.log(values);
    return this.apollo.mutate({
    mutation: updateBookmarkMutation,
    variables: {
      id: values.payload.id,
      title: values.payload.title,
      content: values.payload.content,
      position: values.payload.position
    }
    });
 }


  delete(values) {
    console.log(values);
    return this.apollo.mutate({
      mutation: deleteBookmarkMutation,
      variables : {
        id: values.payload
      }
    });
    // .subscribe((data) =>
    // console.log(data), error => {
    //   console.log(error);
    // });
  }

  addBookmark(values) {
    return this.apollo.mutate({
      mutation: addBookmarkMutation,
      variables: {
        title: values.payload.title,
        position: values.payload.position,
        content: values.payload.content,
      }
    });
  }
}
