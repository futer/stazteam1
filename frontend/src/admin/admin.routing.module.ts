import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';

const adminRoutes: Routes = [
    {path: 'edit', loadChildren: './admin-user-editor/admin-user-editor.component'},
];

@NgModule({
    imports: [RouterModule.forChild(adminRoutes)],
    exports: [RouterModule]
  })
  export class AdminRouting { }
