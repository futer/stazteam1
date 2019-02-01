import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { HttpClientModule } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { userReducer } from './store/admin.reducers';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './store/admin.effects';
<<<<<<< HEAD
import { BookmarkPanelComponent } from './bookmark-panel/bookmark-panel.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/shared/shared.module';
import { BookmarkInfoComponent } from './bookmark-info/bookmark-info.component';
import { BookmarkFormComponent } from './bookmark-form/bookmark-form.component';
=======
import { BookmarkCreatorComponent } from './bookmark-creator/bookmark-creator.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRouting } from './admin.routing.module';
import { SharedModule } from 'src/shared/shared.module';
>>>>>>> 0f016f71e59f717cd913b26aee72c7055770eeb4


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
<<<<<<< HEAD
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    BookmarkPanelComponent
=======
    ReactiveFormsModule,
    AdminRouting,
    SharedModule,
  ],
  exports: [
    AdminUserEditorComponent,
    BookmarkCreatorComponent
>>>>>>> 0f016f71e59f717cd913b26aee72c7055770eeb4
  ]
})
export class AdminModule { }
