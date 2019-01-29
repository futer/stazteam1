import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { MainComponent } from './main/main.component';

import { AuthGuard } from './guards/auth/auth.guard';
import { LoginGuard } from './guards/login/login.guard';
import { DocumentModule } from 'src/document/document.module';
import { BookmarkCreatorComponent } from 'src/admin/bookmark-creator/bookmark-creator.component';
import { AdminModule } from 'src/admin/admin.module';
import { SubpageContainerComponent } from 'src/shared/components/subpage-container/subpage-container.component';
import { ContainerComponent } from 'src/document/container/container.component';
import { AdminUserEditorComponent } from 'src/admin/admin-user-editor/admin-user-editor.component';
import { AdminGuard } from './guards/admin/admin.guard';

const routes: Routes = [
    { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
    { path: 'register', component: RegisterComponent },
    { path: 'main', component: MainComponent, canActivate: [AuthGuard] },
    {
      path: 'doc/:id',
      loadChildren: '../document/document.module#DocumentModule'
    },
    { path: 'user-editor', loadChildren: '../user/user.module#UserModule'},
    { path: 'bookmark-creator', component: BookmarkCreatorComponent},
    { path: 'subpage/:title', component: SubpageContainerComponent},
    { path: 'user-editor', loadChildren: '../user/user.module#UserModule' },
    { path: 'admin', component: AdminUserEditorComponent, canActivate: [AdminGuard] }
  ];

@NgModule({
    imports: [
      RouterModule.forRoot(routes),
      AdminModule,
    ],
    exports: [RouterModule]
  })
export class CoreRoutingModule { }
