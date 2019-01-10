import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';

import { CoreRoutingModule } from '../core/core-routing.module';
import { StoreModule } from '@ngrx/store';
import { Reducer } from '../document/store/document.reducers';
import { ReactiveFormsModule } from '@angular/forms';
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
    ExamplesModule,
    CoreRoutingModule,
    StoreModule.forRoot(Reducer),
    ReactiveFormsModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
