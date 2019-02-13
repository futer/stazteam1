import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { TextPageComponent } from './text-page/text-page.component';
import { EditorRoutingModule } from './editor-routing.module';
import { EditControlsComponent } from './edit-controls/edit-controls.component';
import { CancelBtnComponent } from './edit-controls/cancel-btn/cancel-btn.component';
import { SaveBtnComponent } from './edit-controls/save-btn/save-btn.component';
import { SendBtnComponent } from './edit-controls/send-btn/send-btn.component';
import { EditToolboxComponent } from './edit-toolbox/edit-toolbox.component';
import { BoldBtnComponent } from './edit-toolbox/bold-btn/bold-btn.component';
import { ItalicBtnComponent } from './edit-toolbox/italic-btn/italic-btn.component';
import { UnderBtnComponent } from './edit-toolbox/under-btn/under-btn.component';
import { CiteBtnComponent } from './edit-toolbox/cite-btn/cite-btn.component';
import { AlertComponent } from './alert/alert.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
    declarations: [
        EditorViewComponent,
        TextPageComponent,
        EditControlsComponent,
        CancelBtnComponent,
        SaveBtnComponent,
        SendBtnComponent,
        EditToolboxComponent,
        BoldBtnComponent,
        ItalicBtnComponent,
        UnderBtnComponent,
        CiteBtnComponent,
        AlertComponent
    ],
    imports: [
        CommonModule,
        EditorRoutingModule,
        SharedModule
    ]
})
export class EditorModule {}
