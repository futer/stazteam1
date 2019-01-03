import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SubmitBtnComponent } from './forms/submit-btn/submit-btn.component';
import { InputComponent } from './forms/input/input.component';
import { RouterBTNComponent } from './components/routerBTN/router-btn/router-btn.component';
import { ReactiveFormsModule } from '@angular/forms';
import { LabelComponent } from './components/label/label.component';
import { ImageComponent } from './components/image/image.component';
import { RouterModule } from '@angular/router';
import { ErrorComponent } from './components/error/error.component';

@NgModule({
  declarations: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
    LabelComponent,
    ImageComponent,
    ErrorComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
    LabelComponent,
    ImageComponent,
    ErrorComponent
  ]
})
export class SharedModule { }
