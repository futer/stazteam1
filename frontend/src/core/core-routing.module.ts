import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { BookmarkPanelComponent } from 'src/admin/bookmark-panel/bookmark-panel.component';
import { AdminModule } from 'src/admin/admin.module';
import { SubpageContainerComponent } from 'src/shared/components/subpage-container/subpage-container.component';
import { ContainerComponent } from 'src/document/container/container.component';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    { path: 'user-editor', loadChildren: '../user/user.module#UserModule'},
    { path: 'bookmark-panel', component: BookmarkPanelComponent},
    { path: 'subpage/:title', component: SubpageContainerComponent},
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      AdminModule,
    ],
    exports: [RouterModule]
  })
export class CoreRoutingModule { }
