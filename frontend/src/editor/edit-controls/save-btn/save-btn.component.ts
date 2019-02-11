import { Component, OnInit } from '@angular/core';
import { PdfGeneratorService } from 'src/editor/services/pdf-generator.service';
import jsPDF from 'jspdf';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

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
    this.textRef.textSource.subscribe(ref => {
      const doc = this.pdfGenerator.generatePDF(ref);
      doc.save();
    }).unsubscribe();
  }
}
