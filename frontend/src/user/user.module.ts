import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserEditorComponent } from './user-editor/user-editor.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ModalComponent } from 'src/shared/modal/modal.component';
import { SharedModule } from 'src/shared/shared.module';
import { UserEditorRouting } from './user.routing.module';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/user.reducers';
import { UserEffects } from './store/user.effects';

import { EffectsModule } from '@ngrx/effects';

@NgModule({
  declarations: [
    UserEditorComponent,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserEditorRouting,
    StoreModule.forFeature('currentUser', userReducer),
    EffectsModule.forFeature([UserEffects])
  ],
  exports: [
  ]
})
export class UserModule { }
