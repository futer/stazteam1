import { Injectable, ElementRef } from '@angular/core';
<<<<<<< HEAD
import { PdfGeneratorService } from './pdf-generator.service';
import { BehaviorSubject, Subject } from 'rxjs';
=======
import { BehaviorSubject, Subject } from 'rxjs';
import { UploadModel } from '../models/upload.model';
>>>>>>> c2ff3499d4ca2f40b6d4b0207599526829c7d9f8

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);
<<<<<<< HEAD
  pdfSource = new BehaviorSubject<any>(null);
=======
  pdfSource = new BehaviorSubject<UploadModel>(null);
>>>>>>> c2ff3499d4ca2f40b6d4b0207599526829c7d9f8
  titleSource = new BehaviorSubject<ElementRef>(null);
  titleExistance = new Subject<boolean>();

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

<<<<<<< HEAD
  sharePDF(allpages: Array<any>): void {
=======
  sharePDF(allpages: UploadModel): void {
>>>>>>> c2ff3499d4ca2f40b6d4b0207599526829c7d9f8
    this.pdfSource.next(allpages);
  }

  shareTitle(elRef: ElementRef): void {
    this.titleSource.next(elRef);
  }

  changeTitleStatus(status: boolean): void {
    this.titleExistance.next(status);
  }
}
