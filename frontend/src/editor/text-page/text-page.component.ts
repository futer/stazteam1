import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener,
    Renderer2,
} from '@angular/core';

@Component({
    selector: 'app-text-page',
    templateUrl: './text-page.component.html',
    styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit {
    height = 1000;
    @ViewChild('page') page: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        console.log(this.page.nativeElement.clientHeight, this.page.nativeElement.scrollHeight);
        if (this.page.nativeElement.clientHeight < this.page.nativeElement.scrollHeight) {
            console.log(this.page.nativeElement);
            this.renderer.setStyle(
                this.page.nativeElement,
                'height',
                (this.height = this.height + 1000) + 'px'
            );
        }
    }

    constructor(
      private renderer: Renderer2
    ) {}

    ngOnInit() {}
}
