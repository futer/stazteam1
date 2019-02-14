import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);
  titleSource = new BehaviorSubject<ElementRef>(null);

  titleExistance = new Subject<boolean>();

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }

  shareTitle(elRef: ElementRef): void {
    this.titleSource.next(elRef);
  }

  changeTitleStatus(status: boolean): void {
    this.titleExistance.next(status);
  }
}
