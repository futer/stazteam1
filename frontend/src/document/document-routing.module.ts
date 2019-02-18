import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DocComponent } from './doc/doc.component';
import { AuthGuard } from 'src/core/guards/auth/auth.guard';

const routes: Routes = [
  {
    path: 'doc/:id',
    component: DocComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class DocumentRoutingModule { }
