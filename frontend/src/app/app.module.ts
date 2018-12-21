import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { ReviewModule } from 'src/review/review.module';
import { routing } from './testing/test.routing';
import { Test1Component } from './testing/test1/test1.component';
import { Test2Component } from './testing/test2/test2.component';

@NgModule({
  declarations: [
    AppComponent,
    Test1Component,
    Test2Component,
  ],
  imports: [
    BrowserModule,
    GraphQLModule,
    HttpClientModule,
    routing,

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
