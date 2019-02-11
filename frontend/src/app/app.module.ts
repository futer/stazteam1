import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from '../shared/shared.module';

import { AppComponent } from './app.component';
import { GraphQLModule } from './graphql.module';
import { HttpClientModule } from '@angular/common/http';
import { CoreModule } from '../core/core.module';
import { DocumentModule } from 'src/document/document.module';
import { CoreRoutingModule } from '../core/core-routing.module';
import { StoreModule, ActionReducer, MetaReducer } from '@ngrx/store';
import { docReducer } from '../document/store/document.reducers';
import { ReactiveFormsModule } from '@angular/forms';
import { ExampleRouting } from '../examples/example.routing';
import { ExamplesModule } from 'src/examples/examples.module';
import { UserModule } from 'src/user/user.module';
import { EffectsModule } from '@ngrx/effects';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { JwtHelperService } from '@auth0/angular-jwt';
import authReducer from '../core/store/auth/auth.reducers';
import { AuthEffect } from '../core/store/auth/auth.effects';
import { ChatComponent } from 'src/chat/chat/chat.component';
import { ChatModule } from 'src/chat/chat.module';


export const rootReducer = {
  auth: authReducer
};

export function clearState(reducer: ActionReducer<any>): ActionReducer<any> {
  return function( state, action) {
    if ( action.type === 'CLEAR STORE') {
      state = undefined;
    }
    return reducer(state, action);
  };
}

export const metaReducers: MetaReducer<any>[] = [clearState];

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
    ReactiveFormsModule,
    DocumentModule,
    UserModule,
    StoreModule.forRoot(rootReducer, {metaReducers}),
    EffectsModule.forRoot([AuthEffect]),
    StoreDevtoolsModule.instrument({
      maxAge: 10
    }),
    ExamplesModule,
    ChatModule
  ],
  providers: [
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
