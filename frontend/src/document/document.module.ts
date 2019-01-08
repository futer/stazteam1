import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { DocComponent } from './doc/doc.component';
import { SharedModule } from 'src/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

import { InMemoryCache } from 'apollo-cache-inmemory';

@NgModule({
    declarations: [ContainerComponent, DocPrevComponent, DocComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        ApolloModule,
        HttpLinkModule
    ],
    exports: [ContainerComponent]
})
export class DocumentModule {
    constructor(
      apollo: Apollo,
      httpLink: HttpLink
    ) {
        const link = httpLink.create({
          uri: 'http://localhost:5000/graphql',
          withCredentials: true,
          method: 'GET',
        });

        const authMiddleware = new ApolloLink((operation, forward) => {
          // add the authorization to the headers
          operation.setContext({
            headers: new HttpHeaders().set('Authorization', localStorage.getItem('token') || null)
          });

          return forward(operation);
        });

        const cache = new InMemoryCache();

        // apollo.create({
        //     link: concat(authMiddleware, link),
        //     cache
        // });
    }
}
