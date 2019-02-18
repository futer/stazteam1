import {
    Component,
    OnInit,
    OnChanges,
    Input
} from '@angular/core';
import { DocumentService } from '../services/document.service';

declare const require;
const PDFJS = require('pdfjs-dist/build/pdf');
const pdfWorker = require('pdfjs-dist/build/pdf.worker.entry');
PDFJS.workerSrc = pdfWorker;

@Component({
    selector: 'app-pdf-view',
    templateUrl: './pdf-view.component.html',
    styleUrls: ['./pdf-view.component.scss']
})

export class PdfViewComponent implements OnInit, OnChanges {
    @Input() adress: string;
    private getPages: any;
    actualPage: any;

    private pagesAmount: number;
    private pageNr: number;

    constructor(
        private docService: DocumentService,
    ) {}

    ngOnInit() {
        this.pageNr = 1;
    }

    ngOnChanges() {
        if (this.adress) {
            PDFJS['getDocument'](this.adress).then((pages: any) => {
                this.getPages = pages;
                this.pagesAmount = pages.numPages;
                this.changePage();
            });
        }
    }

    getContent(): void {
        if (this.pageNr <= this.pagesAmount && this.pageNr >= 1)  {
            this.pageNr = Number(this.pageNr);
            this.changePage();
        }
    }

    nextPage(): void {
        if (this.pageNr < this.pagesAmount) {
            this.pageNr++;
            if (this.pageNr >= 1) {
                this.changePage();
            }
        }
    }

    previousPage(): void {
        if (this.pageNr > 1) {
            this.pageNr--;
            if (this.pageNr <= this.pagesAmount) {
                this.changePage();
            }
        }
    }

    changePage(): void {
        this.getPages.getPage(this.pageNr).then((page: any) => {
            this.actualPage = page.getTextContent();
        });
    }
}
