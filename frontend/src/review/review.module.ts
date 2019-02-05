import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ReviewComponent } from './review/review.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { PrevContainerComponent } from './prev-container/prev-container.component';
import { NavMenuPrevComponent } from './nav-menu-prev/nav-menu-prev.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';
import { SharedModule } from 'src/shared/shared.module';
import { DocumentModule } from 'src/document/document.module';
import { ReviewDocComponent } from './review-doc/review-doc.component';

import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';

import { reviewModuleReducers } from './store/review.reducers';
import { ReviewEffects } from './store/review.effects';

@NgModule({
  declarations: [
    TooltipComponent,
    ReviewComponent,
    DocPrevComponent,
    PrevContainerComponent,
    NavMenuPrevComponent,
    NavMenuComponent,
    ReviewDocComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    DocumentModule,
    StoreModule.forFeature('review', reviewModuleReducers),
    EffectsModule.forFeature([ReviewEffects]),
  ],
  exports: [
    ReviewComponent,
    PrevContainerComponent,
  ]
})
export class ReviewModule { }
