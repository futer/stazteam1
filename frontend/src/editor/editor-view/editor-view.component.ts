import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { PageGeneratorService } from '../services/page-generator.service';

@Component({
  selector: 'app-editor-view',
  templateUrl: './editor-view.component.html',
  styleUrls: ['./editor-view.component.scss']
})
export class EditorViewComponent implements OnInit {

  pages$ = this.pageGen.pagesSource.asObservable();

  constructor(
    private pageGen: PageGeneratorService
  ) { }

  ngOnInit() {
    this.pageGen.addPage('1');
  }

}
