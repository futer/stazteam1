import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'user-editor', loadChildren: '../user/user.module#UserModule' },
    { path: 'admin-user-editor', loadChildren: '../admin/admin.module#AdminModule' }
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
export class CoreRoutingModule { }
