import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { DocumentModule } from 'src/document/document.module';
import { CoreRoutingModule } from '../core/core-routing.module';
import { StoreModule } from '@ngrx/store';
import { Reducer } from '../document/store/document.reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleRouting } from 'src/examples/example.routing';
import { ExamplesModule } from 'src/examples/examples.module';
import { UserModule } from 'src/user/user.module';
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
    ExampleRouting,
    ExamplesModule,
    CoreRoutingModule,
    StoreModule.forRoot(Reducer),
    ReactiveFormsModule,
    UserModule,
    DocumentModule,
    StoreModule.forRoot({}),
    EffectsModule.forRoot([]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    ExamplesModule,
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
