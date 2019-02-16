import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';
import { UploadModel } from '../models/upload.model';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);
  pdfSource = new BehaviorSubject<UploadModel>(null);
  titleSource = new BehaviorSubject<ElementRef>(null);
  titleExistance = new Subject<boolean>();

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

  sharePDF(allpages: UploadModel): void {
    this.pdfSource.next(allpages);
  }

  shareTitle(elRef: ElementRef): void {
    this.titleSource.next(elRef);
  }

  changeTitleStatus(status: boolean): void {
    this.titleExistance.next(status);
  }
}
