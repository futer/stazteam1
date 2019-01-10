import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewModule } from 'src/review/review.module';
import { CoreModule } from '../core/core.module';
import { Example1Component } from './examples/example1/example1.component';
import { Example2Component } from './examples/example2/example2.component';
import { DocumentModule } from 'src/document/document.module';

import { routing } from './examples/example.routing';
import { CoreRoutingModule } from '../core/core-routing.module';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

@NgModule({
  declarations: [
    AppComponent,
    Example1Component,
    Example2Component,
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
    })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
