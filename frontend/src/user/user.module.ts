import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from 'src/shared/shared.module';
import { UserEditorRouting } from './user.routing.module';
import { UserEditorComponent } from './user-editor/user-editor.component';
import userReducer from './store/user.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/user.effects';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    UserEditorRouting,
    SharedModule,
    StoreModule.forFeature('current', userReducer),
    EffectsModule.forFeature([UserEffects]),
  ],
  exports: [
  ]
})
export class UserModule { }
