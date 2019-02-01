import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';
import { BookmarkCreatorComponent } from './bookmark-creator/bookmark-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRouting } from './admin.routing.module';
import { SharedModule } from 'src/shared/shared.module';


@NgModule({
  declarations: [
    AdminUserEditorComponent,
    BookmarkCreatorComponent,
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    StoreModule.forFeature('users', userReducer),
    EffectsModule.forFeature([UserEffects]),
    FormsModule,
    ReactiveFormsModule,
    AdminRouting,
    SharedModule,
  ],
  exports: [
    AdminUserEditorComponent,
    BookmarkCreatorComponent
  ]
})
export class AdminModule { }
