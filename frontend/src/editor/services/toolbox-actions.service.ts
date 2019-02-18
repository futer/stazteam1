import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { UploadModel } from '../models/upload.model';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  private textSource = new BehaviorSubject<ElementRef>(null);
  private pdfSource = new BehaviorSubject<UploadModel>(null);
  private titleSource = new BehaviorSubject<ElementRef>(null);

  observeText$ = this.textSource.asObservable();
  observePDFData$ = this.pdfSource.asObservable();
  observeTitle$ = this.titleSource.asObservable();

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

  sharePDF(allpages: UploadModel): void {
    this.pdfSource.next(allpages);
  }

  shareTitle(elRef: ElementRef): void {
    this.titleSource.next(elRef);
  }
}
