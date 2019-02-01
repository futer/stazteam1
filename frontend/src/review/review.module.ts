import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TooltipComponent } from './tooltip/tooltip.component';
import { ReviewComponent } from './review/review.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { PrevContainerComponent } from './prev-container/prev-container.component';
import { NavMenuPrevComponent } from './nav-menu-prev/nav-menu-prev.component';
import { NavMenuComponent } from './nav-menu/nav-menu.component';

@NgModule({
  declarations: [
    TooltipComponent,
     ReviewComponent,
     DocPrevComponent,
     PrevContainerComponent,
     NavMenuPrevComponent,
     NavMenuComponent,
    ],
  imports: [
    CommonModule
  ]
})
export class ReviewModule { }
