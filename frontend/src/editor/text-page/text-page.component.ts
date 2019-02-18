import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener,
    Renderer2,
    OnDestroy
} from '@angular/core';
import { ToolboxActionsService } from '../services/toolbox-actions.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-text-page',
    templateUrl: './text-page.component.html',
    styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit, OnDestroy {
    height = 1000;
<<<<<<< HEAD
    titleStatus = true;
    titleSub: Subscription;
=======
    data: string;
    titleStatus = true;
    titleSub: Subscription;
    uploadSub: Subscription;
    loadedTitle: string;
    showModal = false;
>>>>>>> c2ff3499d4ca2f40b6d4b0207599526829c7d9f8

    @ViewChild('page') page: ElementRef;
    @ViewChild('title', { read: ElementRef }) title: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        if (this.page.nativeElement.offsetHeight > this.height) {
            this.renderer.setStyle(
                this.page.nativeElement,
                'min-height',
                (this.height = this.height + 1000) + 'px'
            );
        }
    }

    constructor(
        private renderer: Renderer2,
        private refShare: ToolboxActionsService
    ) {

    }

    ngOnInit() {
        this.page.nativeElement.focus();
        this.refShare.shareText(this.page);
        this.refShare.shareTitle(this.title);

        this.uploadSub = this.refShare.pdfSource.subscribe(res => {
            if (res) {
                if (this.page.nativeElement.innerText !== '') {
                    this.showModal = true;
                } else {
                    this.loadedTitle = res['title'];
                    this.insertUploadedText(res['pages']);
                }

            }
        });
        this.titleSub = this.refShare.titleExistance.subscribe(res => {
            this.titleStatus = res;
        });
    }

    ngOnDestroy() {
        this.uploadSub.unsubscribe();
        this.titleSub.unsubscribe();
    }

    titleExists(): void {
        if (!this.titleStatus) {
            this.titleStatus = true;
        }
<<<<<<< HEAD
=======
    }

    insertUploadedText(pages: Array<Object>): void {
        this.data = '';

        pages.forEach(page => {
            page['items'].forEach(lines => {
                this.data += lines.str;
            });
        });

        this.page.nativeElement.innerHTML = this.data;
    }

    swap() {
        this.refShare.pdfSource.subscribe(res => {
            this.loadedTitle = res['title'];
            this.insertUploadedText(res['pages']);
        }).unsubscribe();
        this.showModal = false;
>>>>>>> c2ff3499d4ca2f40b6d4b0207599526829c7d9f8
    }
}
