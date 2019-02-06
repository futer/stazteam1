import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EditorViewComponent } from './editor-view/editor-view.component';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'docedit',
    component: EditorViewComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class EditorRoutingModule { }
