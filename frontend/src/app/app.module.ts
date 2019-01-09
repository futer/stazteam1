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

import { routing } from './examples/example.routing';
import { CoreRoutingModule } from '../core/core-routing.module';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffects } from 'src/core/store/auth.effects';
import { StoreModule } from '@ngrx/store';
import { Reducer } from '../document/store/document.reducers';

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
<<<<<<< HEAD
    EffectsModule.forRoot([AuthEffects])
=======
    StoreModule.forRoot(Reducer)
>>>>>>> master
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
