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
import { Subscription, Observable } from 'rxjs';

@Component({
    selector: 'app-text-page',
    templateUrl: './text-page.component.html',
    styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit, OnDestroy {
    height = 1000;
    allpages: Observable<Array<any>>;
    titleStatus = true;
    titleSub: Subscription;
    uploadSub: Subscription;

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
    ) {}

    ngOnInit() {
        this.page.nativeElement.focus();
        this.refShare.shareText(this.page);
        this.refShare.shareTitle(this.title);

        this.uploadSub = this.refShare.pdfSource.subscribe(res => {
            this.allpages = res;
        });
        this.titleSub = this.refShare.titleExistance.subscribe(res => {
            this.titleStatus = res;
        });
    }

    ngOnDestroy() {
        this.uploadSub.unsubscribe();
        this.titleSub.unsubscribe();
    }

    titleExists() {
        if (!this.titleStatus) {
            this.titleStatus = true;
        }
    }
}
