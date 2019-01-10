import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { ModalService } from 'src/shared/modal/modal.service';
import { SharedModule } from 'src/shared/shared.module';
import { ModalComponent } from 'src/shared/modal/modal.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    Example1Component,
    Example2Component,
    ModalComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  providers: [
    ModalService,
  ]
})
export class ExamplesModule { }
