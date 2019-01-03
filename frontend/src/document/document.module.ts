import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { DocComponent } from './doc/doc.component';
import { SharedModule } from 'src/shared/shared.module';

@NgModule({
  declarations: [ContainerComponent, DocPrevComponent, DocComponent],
  imports: [
    CommonModule,
    SharedModule
  ],
  exports: [
    ContainerComponent
  ]
})
export class DocumentModule { }
