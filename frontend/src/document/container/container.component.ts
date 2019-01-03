import { Component, OnInit, OnDestroy } from '@angular/core';
import { DocumentModel } from '../models/document.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-container',
  templateUrl: './container.component.html',
  styleUrls: ['./container.component.scss']
})
export class ContainerComponent implements OnInit, OnDestroy {
  prevs: Observable<DocumentModel>;

  constructor() { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    // Called once, before the instance is destroyed.
    // Add 'implements OnDestroy' to the class.
  }
}
