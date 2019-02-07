import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { DocComponent } from './doc/doc.component';
import { SharedModule } from 'src/shared/shared.module';
import { HttpClientModule } from '@angular/common/http';
import { docModuleReducers } from '../document/store/document.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from 'src/document/store/document.effects';
import { DocumentRoutingModule } from './document-routing.module';
import { PdfViewComponent } from './pdf-view/pdf-view.component';
import { FormsModule } from '@angular/forms';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

@NgModule({
    declarations: [ContainerComponent, DocPrevComponent, DocComponent, PdfViewComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        DocumentRoutingModule,
        FormsModule,
        InfiniteScrollModule,
        StoreModule.forFeature('docModule', docModuleReducers ),
        EffectsModule.forFeature([DocumentEffects]),
    ],
    exports: [
        ContainerComponent,
        DocComponent,
        DocPrevComponent,
    ]
})
export class DocumentModule {}
