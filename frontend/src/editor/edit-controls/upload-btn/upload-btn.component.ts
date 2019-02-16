import { Component } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';
import { UploadModel } from 'src/editor/models/upload.model';
declare const require;
const PDFJS = require('pdfjs-dist/build/pdf');
const pdfWorker = require('pdfjs-dist/build/pdf.worker.entry');
PDFJS.workerSrc = pdfWorker;

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.scss']
})
export class UploadBtnComponent {
  allPages: Array<Object>;
  pdfTitle: string;

  constructor(
    private refShare: ToolboxActionsService,
  ) { this.allPages = []; }

  // my brain hurts when i see so many callbacks >.< --Szw4gier
  async pdfUpload(event) {
    this.allPages = [];
    let pdf = event.target.files[0];
    this.pdfTitle = pdf.name.substring(0, pdf.name.length - 4);

    const reader = new FileReader;
    reader.readAsDataURL(pdf);

    await new Promise((resolve) => {
        reader.onload = () => {
            pdf = reader.result.toString().split(',')[1];
            const decode = atob(pdf);
            const pdfBlob = new Blob([decode], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);

            PDFJS['getDocument'](url).then(data => {
              resolve(data);
             });
          };
    }).then(res => {
      this.getPages(res);
    });
  }

  async getPages(pages: any): Promise<void> {
    for (let i = 1; i < pages.numPages + 1; i++) {
      await pages.getPage(i).then(async page => {
        const actPage = page.getTextContent();
        this.extractPageData(actPage);
      });
    }
    this.sendPDF();
  }

  async extractPageData(actPage: Promise<Object>): Promise<void> {
    await actPage.then(page => { this.allPages.push(page); });
  }

  sendPDF(): void {
    this.refShare.sharePDF(<UploadModel>{
      title: this.pdfTitle,
      pages: this.allPages
    });
  }
}
