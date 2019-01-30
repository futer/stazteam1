import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/shared/shared.module';
import { UserEditorRouting } from './user.routing.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserEditorRouting,
  ],
  exports: [
  ]
})
export class UserModule { }
