import { Routes, RouterModule } from '@angular/router';

import { UserEditorComponent } from './user-editor/user-editor.component';
import { AuthGuard } from '../core/guards/auth/auth.guard';

const appRoutes: Routes = [
    {path: 'user-editor', component: UserEditorComponent, canActivate: [AuthGuard]},
];

export const routing = RouterModule.forRoot(appRoutes);
