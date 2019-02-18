import { Component, OnInit } from '@angular/core';
import { PdfGeneratorService } from 'src/editor/services/pdf-generator.service';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';
import { zip } from 'rxjs';

@Component({
  selector: 'app-save-btn',
  templateUrl: './save-btn.component.html',
  styleUrls: ['./save-btn.component.scss']
})
export class SaveBtnComponent implements OnInit {

  constructor(
    private pdfGenerator: PdfGeneratorService,
    private textRef: ToolboxActionsService
  ) { }

  ngOnInit() {
  }

  savePDF() {
    zip(
      this.textRef.textSource,
      this.textRef.titleSource
    ).subscribe(ref => {

      if (ref[1].nativeElement.firstChild.value !== '') {
        const doc = this.pdfGenerator.generatePDF(ref[0]);
        doc.save(ref[1].nativeElement.firstChild.value + '.pdf');
      } else {
        this.textRef.changeTitleStatus(false);
      }

    }).unsubscribe();
  }
}
