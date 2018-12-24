import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitBtnComponent } from './forms/submit-btn/submit-btn.component';

import { RouterBTNComponent } from './components/routerBTN/router-btn/router-btn.component';

@NgModule({
  declarations: [
    SubmitBtnComponent,

    RouterBTNComponent,
  ],

  imports: [
    CommonModule,
  ],
  exports: [
    SubmitBtnComponent,
    
    RouterBTNComponent,
  ]
})
export class SharedModule { }
