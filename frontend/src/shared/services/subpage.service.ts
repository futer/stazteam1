import { Injectable } from '@angular/core';
import { Apollo } from 'apollo-angular';
import gql from 'graphql-tag';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';



const BookmarkQuery = gql`
query Bookmarks {
 bookmarks {
   title
   position
   content
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
}
