import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from '../core/guards/auth/auth.guard';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
    {path: '**', redirectTo: ''},
];

@NgModule({
    imports: [RouterModule.forChild(appRoutes)],
    exports: [RouterModule]
  })
  export class UserEditorRouting { }
