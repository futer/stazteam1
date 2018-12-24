import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './forms/submit/submit.component';
import { RouterBTNComponent } from './components/routerBTN/router-btn/router-btn.component';
import { InputComponent } from './forms/input/input.component';

@NgModule({
  declarations: [
    SubmitComponent,
    InputComponent,
    RouterBTNComponent,
  ],
  imports: [
    CommonModule,
  ],
  exports: [
    SubmitComponent,
    InputComponent,
    RouterBTNComponent,
  ]
})
export class SharedModule { }
