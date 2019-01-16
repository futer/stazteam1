import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContainerComponent } from './container/container.component';
import { DocPrevComponent } from './doc-prev/doc-prev.component';
import { DocComponent } from './doc/doc.component';
import { SharedModule } from 'src/shared/shared.module';

import { HttpClientModule } from '@angular/common/http';

import { docReducer } from '../document/store/document.reducers';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { DocumentEffects } from 'src/document/store/document.effects';
import { DocumentRoutingModule } from './document-routing.module';

@NgModule({
    declarations: [ContainerComponent, DocPrevComponent, DocComponent],
    imports: [
        CommonModule,
        SharedModule,
        HttpClientModule,
        DocumentRoutingModule,
        StoreModule.forFeature('documents', docReducer),
        EffectsModule.forFeature([DocumentEffects]),
    ],
    exports: [ContainerComponent]
})
export class DocumentModule {}
