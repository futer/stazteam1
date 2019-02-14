import { Injectable, ElementRef } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ToolboxActionsService {

  constructor() { }

  textSource = new BehaviorSubject<ElementRef>(null);

  shareText(elRef: ElementRef): void {
    this.textSource.next(elRef);
  }
}
