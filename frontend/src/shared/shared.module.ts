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
import { ButtonComponent } from './components/button/button.component';
import { ModalComponent } from './components/modal/modal.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RadioButtonsComponent } from './forms/radio-buttons/radio-buttons.component';
import { LoadingSpinnerComponent } from './components/loading-spinner/loading-spinner.component';
import { SuccessComponent } from './components/success/success.component';
import { TextboxComponent } from './components/textbox/textbox.component';


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
    ButtonComponent,
    ModalComponent,
    RadioButtonsComponent,
    LoadingSpinnerComponent,
    SuccessComponent,
    TextboxComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule,
    BrowserAnimationsModule
  ],
  exports: [
    SubmitBtnComponent,
    InputComponent,
    RouterBTNComponent,
    LabelComponent,
    ImageComponent,
    ErrorComponent,
    SubpageContainerComponent,
    LikeBtnComponent,
    ButtonComponent,
    ModalComponent,
    RadioButtonsComponent,
    LoadingSpinnerComponent,
    SuccessComponent,
    TextboxComponent
  ]
})
export class SharedModule { }
