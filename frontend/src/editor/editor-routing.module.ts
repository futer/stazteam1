import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EditorViewComponent } from './editor-view/editor-view.component';
import { EditorGuard } from 'src/core/guards/editor/editor.guard';

const routes: Routes = [
  {
    path: 'doc-edit',
    component: EditorViewComponent,
    canActivate: [EditorGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
