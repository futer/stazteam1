import { Routes, RouterModule } from '@angular/router';

import { AdminUserEditorComponent } from './admin-user-editor/admin-user-editor.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: '', component: AdminUserEditorComponent},
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })
  export class AdminUserEditorRouting { }
