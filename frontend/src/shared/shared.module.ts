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
import { SubpageContainerComponent } from './components/subpage-container/subpage-container.component';
import { SubpageService } from './services/subpage.service';
import { LikeBtnComponent } from './components/like-btn/like-btn.component';


@NgModule({
  declarations: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
    LabelComponent,
    ImageComponent,
    ErrorComponent,
    SubpageContainerComponent,
    LikeBtnComponent,
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
    ErrorComponent,
    SubpageContainerComponent,
    LikeBtnComponent
  ]
})
export class SharedModule { }
