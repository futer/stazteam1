import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';

import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DocumentModule } from 'src/document/document.module';
import { StoreModule } from '@ngrx/store';
import authReducer from './store/auth/auth.reducers';
import { EffectsModule } from '@ngrx/effects';
import { AuthEffect } from './store/auth/auth.effects';
import { SidebarComponent } from './sidebar/sidebar.component';
import { reducers } from './store';
import { BookmarkEffect } from './store/bookmark/bookmark.effects';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavComponent,
    MainComponent,
    SidebarComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DocumentModule,
    StoreModule.forFeature('core', reducers),
    EffectsModule.forFeature([AuthEffect, BookmarkEffect]),
  ],
  exports: [
    NavComponent,
    SidebarComponent
  ],
})
export class CoreModule { }
