import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';
import { UserEditorComponent } from './user-editor/user-editor.component';

const userRoutes: Routes = [
    {path: 'user-editor', component: UserEditorComponent},
];

@NgModule({
    imports: [RouterModule.forChild(userRoutes)],
    exports: [RouterModule]
  })
  export class UserEditorRouting { }
