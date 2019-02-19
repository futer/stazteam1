import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/shared/shared.module';
import { DocumentModule } from 'src/document/document.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { ReviewRoutingModule } from './review-routing.module';
import { ReactiveFormsModule } from '@angular/forms';

import { TooltipComponent } from './tooltip/tooltip.component';
import { ReviewComponent } from './review/review.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { ReviewDocComponent } from './review-doc/review-doc.component';
import { MarkedTextComponent } from './marked-text/marked-text.component';
import { CommentsComponent } from './comments/comments.component';

import { reviewModuleReducers } from './store/review.reducers';
import { ReviewEffects } from './store/review.effects';

@NgModule({
  declarations: [
    TooltipComponent,
    ReviewComponent,
    NavMenuComponent,
    ReviewDocComponent,
    MarkedTextComponent,
    CommentsComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DocumentModule,
    InfiniteScrollModule,
    ReviewRoutingModule,
    ReactiveFormsModule,
    StoreModule.forFeature('review', reviewModuleReducers),
    EffectsModule.forFeature([ReviewEffects]),
  ],
  exports: [
    ReviewComponent,
    ReviewDocComponent,
  ]
})
export class ReviewModule { }
