import { Routes, RouterModule } from '@angular/router';

import { UserEditorComponent } from './user-editor/user-editor.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: '', component: UserEditorComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })
  export class UserEditorRouting { }
