import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';


@NgModule({
  declarations: [AdminUserEditorComponent],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects])
  ]
})
export class AdminModule { }
