import { Injectable, ElementRef } from '@angular/core';
import { PdfGeneratorService } from './pdf-generator.service';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);
  pdfSource = new BehaviorSubject<any>(null);
  titleSource = new BehaviorSubject<ElementRef>(null);
  titleExistance = new Subject<boolean>();

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

  sharePDF(allpages: Array<any>): void {
    this.pdfSource.next(allpages);
  }

  shareTitle(elRef: ElementRef): void {
    this.titleSource.next(elRef);
  }

  changeTitleStatus(status: boolean): void {
    this.titleExistance.next(status);
  }
}
