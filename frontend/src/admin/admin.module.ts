import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';
import { BookmarkPanelComponent } from './bookmark-panel/bookmark-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { BookmarkInfoComponent } from './bookmark-info/bookmark-info.component';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';
import { AdminRouting } from './admin.routing.module';


@NgModule({
  declarations: [
    AdminUserEditorComponent,
    BookmarkPanelComponent,
    BookmarkInfoComponent,
    BookmarkFormComponent,
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
    BookmarkPanelComponent,
  ]
})
export class AdminModule { }
