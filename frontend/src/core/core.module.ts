import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NavComponent } from './nav/nav.component';

import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    LoginComponent,
    RegisterComponent,
    NavComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  exports: [
    NavComponent
  ],
})
export class CoreModule { }
