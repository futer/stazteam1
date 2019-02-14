import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { PdfGeneratorService } from './pdf-generator.service';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);
  pdfSource = new BehaviorSubject<any>(null);

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

  sharePDF(allpages: Array<any>): void {
    this.pdfSource.next(allpages);
  }
}
