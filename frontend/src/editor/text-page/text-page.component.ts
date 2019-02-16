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
    allpages = null;
    titleStatus = true;
    titleSub: Subscription;
    uploadSub: Subscription;
    loadedTitle: string;
    showModal = false;

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
        // this.allpages = [];
        this.page.nativeElement.focus();
        this.refShare.shareText(this.page);
        this.refShare.shareTitle(this.title);

        this.uploadSub = this.refShare.pdfSource.subscribe(res => {
            console.log(res);
            if (res) {
                if (this.page.nativeElement.innerText !== '' && this.allpages[1] !== '') {
                    // this.res = res;
                    this.showModal = true;
                } else {
                    this.loadedTitle = res[0];
                    this.insertUploadedText(res[1]);
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
    }

    insertUploadedText(pages: Object): void {
        console.log(pages);
    }

    swap() {
        // this.page.nativeElement.textContent = '';
        console.log('page', this.page);
        this.refShare.pdfSource.subscribe(res => {
            console.log(res);
            // this.page.nativeElement.innerHTML = '';
            this.allpages = res;
            // this.page.nativeElement.childNodes.forEach(element => {
            //     element.data = [];
            // });

            // let child = this.page.nativeElement;
            // while (child.firstChild) {
            //     console.log(child.firstChild)
            //     if (child.firstChild.tagName === "SPAN"){
            //         child = child.firstChild.nextSibling;
            //     }
            //     child.remove(child.firstChild);
            // }
            // for (let i = 0; i < this.page.nativeElement.children.length; i++) {
            //     console.log(this.page.nativeElement.children[i])
            // }

            // console.log('res',res);
            // this.loadedTitle = res[0];
            // let temp = '';
            // for (let i = 1; i < res.length; i++){
            //     console.log('elo');
            //     for (let j = 0; j < res[i].items.length; j++){
            //         console.log('ELOOO', res[i].items[j].str);
            //         console.log('elo');
            //         temp += res[i].items[j].str + '<br>';
            //     }
            // }
            // console.log(temp);

            // this.loadedTitle = res[0];
            // const temp = [];
            // for (let i = 1; i < res.length; i++){
            //     for (let j = 0; j < res[i].items.length; j++){
            //         temp.push(res[i].items[j].str);
            //     }
            //     this.allpages.push(temp);
            // }
            // console.log(res);

            // // this.allpages.forEach(element => {
            // //     this.renderer.setProperty(this.page.nativeElement.childNodes, 'textContent', element + '\n');
            // // });
            // console.log(res.length)
            // for (let i = 1; i < res.length; i++) {
            //     if (this.page.nativeElement.childNodes[i].nodeType = 3)
            //     {
            //         this.renderer.setProperty(this.page.nativeElement.childNodes[i], 'textContent', 'elo');

            //     }
            // }
        }).unsubscribe();
        this.showModal = false;
        // console.log('allpages', this.allpages, 'loaded', this.loadedTitle);
    }

    elo() {
        console.log(this.page.nativeElement.textContent);

        // console.log(this.page);
        // this.refShare.pdfSource.subscribe(res => {
        //     const child = this.page.nativeElement;
        //     console.log(child.firstChild)
        //     while (child.firstChild) {
        //         console.log(child.firstChild)
        //         child.removeChild(child.firstChild);
        //     }
        //     console.log('res', res[0]);
        //     this.loadedTitle = res[0];
        //     this.allpages = res;
        // }).unsubscribe();
        // this.showModal = false;
    }
}
