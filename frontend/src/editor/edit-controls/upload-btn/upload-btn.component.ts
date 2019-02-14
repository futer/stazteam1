import { Component, OnInit } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';
declare const require;
const PDFJS = require('pdfjs-dist/build/pdf');
const pdfWorker = require('pdfjs-dist/build/pdf.worker.entry');
PDFJS.workerSrc = pdfWorker;

@Component({
  selector: 'app-upload-btn',
  templateUrl: './upload-btn.component.html',
  styleUrls: ['./upload-btn.component.scss']
})
export class UploadBtnComponent implements OnInit {
  pages;
  actpage;
  allpages: Array<any>;
  constructor(
    private refShare: ToolboxActionsService,
  ) { }

  ngOnInit() {
    this.allpages = [];
  }

  async pdfUpload(event) {
    let pdf = event.target.files[0];
    const reader = new FileReader;
    reader.readAsDataURL(pdf);
    await new Promise((resolve, reject) => {
        reader.onload = () => {
            pdf = reader.result.toString().split(',')[1];
            const decode = atob(pdf);
            const pdfBlob = new Blob([decode], { type: 'application/pdf' });
            const url = URL.createObjectURL(pdfBlob);
            PDFJS['getDocument'](url).then(data => {
              this.pages = data;
              for (let i = 1; i < this.pages.numPages + 1; i++) {
                this.pages.getPage(i).then(elo => {
                  this.actpage = elo.getTextContent();
                  this.actpage.then(page => { this.allpages.push(page); });
                });
                console.log(this.allpages)
                this.refShare.sharePDF(this.allpages);
              }
             });
          };
    });
  }

}
