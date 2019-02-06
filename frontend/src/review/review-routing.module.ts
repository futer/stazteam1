import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AuthGuard } from 'src/core/guards/auth/auth.guard';
import { ReviewComponent } from './review/review.component';
import { ReviewDocComponent } from './review-doc/review-doc.component';


const routes: Routes = [
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [AuthGuard]
  }, {
    path: 'review/:id',
    component: ReviewDocComponent,
    canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
