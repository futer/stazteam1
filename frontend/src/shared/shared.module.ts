import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitBtnComponent } from './forms/submit-btn/submit-btn.component';
import { InputComponent } from './forms/input/input.component';
import { RouterBTNComponent } from './components/routerBTN/router-btn/router-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from './forms/label/label.component';

@NgModule({
  declarations: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
    LabelComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
  ],
  exports: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
  ]
})
export class SharedModule { }
