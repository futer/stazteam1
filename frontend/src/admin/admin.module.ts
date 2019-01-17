import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';
import { AdminUserEditorRouting } from './admin.routing.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AdminUserEditorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    AdminUserEditorRouting,
    ReactiveFormsModule,
    SharedModule,
    FormsModule
  ]
})
export class AdminModule { }
