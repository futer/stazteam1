import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Example1Component } from './example1/example1.component';
import { Example2Component } from './example2/example2.component';
import { SharedModule } from 'src/shared/shared.module';
import { ReactiveFormsModule } from '@angular/forms';

import { ChatModule } from 'src/chat/chat.module';

@NgModule({
  declarations: [
    Example1Component,
    Example2Component,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    ChatModule,
  ],
  providers: []
})

export class ExamplesModule { }

