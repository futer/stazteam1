import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { TextPageComponent } from './text-page/text-page.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditControlsComponent } from './edit-controls/edit-controls.component';
import { CancelBtnComponent } from './edit-controls/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from './edit-controls/save-btn/save-btn.component';
import { SendBtnComponent } from './edit-controls/send-btn/send-btn.component';

@NgModule({
  declarations: [EditorViewComponent, TextPageComponent, EditControlsComponent, CancelBtnComponent, SaveBtnComponent, SendBtnComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
