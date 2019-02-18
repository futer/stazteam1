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
    private height = 1000;
    private data: string;
    private titleSub: Subscription;
    private uploadSub: Subscription;
    loadedTitle: string;
    showModal = false;

    @ViewChild('page') page: ElementRef;
    @ViewChild('title', { read: ElementRef }) title: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        this.loadedTitle = this.title.nativeElement.firstChild.value;
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
    ) {}

    ngOnInit() {
        this.page.nativeElement.focus();
        this.refShare.shareText(this.page);
        this.refShare.shareTitle(this.title);

        this.uploadSub = this.refShare.observePDFData$.subscribe(res => {
            if (res) {
                this.showModal = this.checkInnerHTML();
                if (!this.showModal) {
                    this.loadedTitle = res['title'];
                    this.insertUploadedText(res['pages']);
                }
            }
        });
        this.titleSub = this.refShare.observeTitle$.subscribe(res => {
            this.loadedTitle = res.nativeElement.firstChild.value;
        });
    }

    ngOnDestroy() {
        this.uploadSub.unsubscribe();
        this.titleSub.unsubscribe();
    }

    checkInnerHTML(): boolean {
        if (this.page.nativeElement.innerText !== '') {
            return true;
        }
        return false;
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

    swapPDFData(): void {
        this.refShare.observePDFData$.subscribe(res => {
            this.loadedTitle = res['title'];
            this.insertUploadedText(res['pages']);
        }).unsubscribe();
        this.showModal = false;
    }
}
