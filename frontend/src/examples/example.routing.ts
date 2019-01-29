import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';

const appRoutes: Routes = [
    {
      path: 'example1',
      component: Example1Component
    },
    {
      path: 'example2',
      component: Example2Component
    },
];

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class ExampleRouting {}
//     {
//       path: '',
//       component: Example1Component
//     },
//     {
//       path: '**',
//       redirectTo: ''
//     },
// ];

// export const routing = RouterModule.forRoot(appRoutes);
