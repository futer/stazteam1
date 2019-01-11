import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/shared/modal/modal.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [
    UserEditorComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
  ]
})
export class UserModule { }
