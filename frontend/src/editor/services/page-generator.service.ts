import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageGeneratorService {

  constructor() { }

  pagesSource = new BehaviorSubject<Array<string>>([]);
}
