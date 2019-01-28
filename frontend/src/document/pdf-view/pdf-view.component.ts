import { Component, OnInit, OnChanges, Input } from '@angular/core';

import * as PDFJS from 'pdfjs-dist';

@Component({
    selector: 'app-pdf-view',
    templateUrl: './pdf-view.component.html',
    styleUrls: ['./pdf-view.component.scss']
})
export class PdfViewComponent implements OnInit, OnChanges {
    getPages;
    actualPage;
    @Input() adress: string;

    pagesAmount: number;
    pageNr: number;

    constructor() {}

    ngOnInit() {
        this.pageNr = 1;
    }

    ngOnChanges() {
        if (this.adress) {
            PDFJS['getDocument'](this.adress).then(pages => {
                this.getPages = pages;
                this.pagesAmount = pages.numPages;
                this.changePage();
            });
        }
    }

    getContent() {
        if (this.pageNr <= this.pagesAmount && this.pageNr >= 1)  {
            this.pageNr = Number(this.pageNr);
            this.changePage();
        }
    }

    nextPage() {
        if (this.pageNr < this.pagesAmount) {
            this.pageNr++;
            if (this.pageNr >= 1) {
                this.changePage();
            }
        }
    }

    previousPage() {
        if (this.pageNr > 1) {
            this.pageNr--;
            if (this.pageNr <= this.pagesAmount) {
                this.changePage();
            }
        }
    }

    changePage() {
        this.getPages.getPage(this.pageNr).then(page => this.actualPage = page.getTextContent());
    }
}