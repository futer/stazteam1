import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ReviewGuard } from '../core/guards/review/review.guard';
import { ReviewComponent } from './review/review.component';
import { ReviewDocComponent } from './review-doc/review-doc.component';


const routes: Routes = [
  {
    path: 'review',
    component: ReviewComponent,
    canActivate: [ReviewGuard]
  }, {
    path: 'review/:id',
    component: ReviewDocComponent,
    canActivate: [ReviewGuard]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReviewRoutingModule { }
