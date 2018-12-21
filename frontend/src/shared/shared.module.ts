import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitComponent } from './forms/submit/submit.component';
import { InputComponent } from './forms/input/input.component';

@NgModule({
  declarations: [SubmitComponent, InputComponent],
  imports: [
    CommonModule
  ]
})
export class SharedModule { }
