import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewModule } from 'src/review/review.module';
import { CoreModule } from '../core/core.module';
import { DocumentModule } from 'src/document/document.module';
import { CoreRoutingModule } from '../core/core-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { routing } from 'src/examples/example.routing';
import { ExamplesModule } from 'src/examples/examples.module';


@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    SharedModule,
    CoreModule,
    routing,
    CoreRoutingModule,
    DocumentModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    ExamplesModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
