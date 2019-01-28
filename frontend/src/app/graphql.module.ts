import { NgModule } from '@angular/core';
import { ApolloModule, Apollo } from 'apollo-angular';
import { HttpLinkModule, HttpLink } from 'apollo-angular-link-http';
import { ApolloLink, concat } from 'apollo-link';
import { HttpHeaders } from '@angular/common/http';

import { InMemoryCache } from 'apollo-cache-inmemory';

import { environment } from 'src/environments/environment';

@NgModule({
    imports: [ApolloModule, HttpLinkModule],
    exports: [ApolloModule, HttpLinkModule]
})
export class GraphQLModule {
    constructor(apollo: Apollo, httpLink: HttpLink) {
        const link = httpLink.create({
            uri: environment.adress + 'graphql',
            withCredentials: false,
            method: 'POST'
        });

        const authMiddleware = new ApolloLink((operation, forward) => {
            // add the authorization to the headers
            operation.setContext({
                headers: new HttpHeaders().set(
                    'Authorization',
                    localStorage.getItem('token') || null
                )
            });

            return forward(operation);
        });

        const cache = new InMemoryCache();

        apollo.create({
            link: concat(authMiddleware, link),
            cache
        });

        // apollo.create({
        //     link: concat(authMiddleware, link),
        //     cache: new InMemoryCache(),
        //     defaultOptions: {
        //       watchQuery: {
        //         fetchPolicy: 'network-only',
        //         errorPolicy: 'ignore',
        //       },
        //       query: {
        //         fetchPolicy: 'no-cache',
        //         errorPolicy: 'all',
        //       }
        //     }
        //   });
    }
}
