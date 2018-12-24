import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './forms/submit/submit.component';
import { RouterBTNComponent } from './components/routerBTN/router-btn/router-btn.component';

@NgModule({
  declarations: [
    SubmitComponent,
    RouterBTNComponent
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    RouterBTNComponent
  ]
})
export class SharedModule { }
