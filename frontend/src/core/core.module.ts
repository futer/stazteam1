import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { MainComponent } from './main/main.component';
import { DocumentModule } from 'src/document/document.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavComponent,
    MainComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
    HttpClientModule,
    DocumentModule,
  ],
  exports: [
    NavComponent
  ],
})
export class CoreModule { }
