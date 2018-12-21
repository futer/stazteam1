import { Routes, RouterModule } from '@angular/router';

import { Test1Component } from './test1/test1.component';
import { Test2Component } from './test2/test2.component';

const appRoutes: Routes = [
    {path: 'test1', component: Test1Component},
    {path: 'test2', component: Test2Component},
    {path: '', component: Test1Component},
    {path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
