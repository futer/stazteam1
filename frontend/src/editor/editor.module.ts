import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { TextPageComponent } from './text-page/text-page.component';
import { EditorRoutingModule } from './editor-routing.module';

@NgModule({
  declarations: [EditorViewComponent, TextPageComponent],
  imports: [
    CommonModule,
    EditorRoutingModule
  ]
})
export class EditorModule { }
