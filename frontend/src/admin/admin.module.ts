import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';
import { BookmarkCreatorComponent } from './bookmark-creator/bookmark-creator.component';
import { FormsModule } from '@angular/forms';


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
    FormsModule
  ],
  exports: [
    BookmarkCreatorComponent
  ]
})
export class AdminModule { }
