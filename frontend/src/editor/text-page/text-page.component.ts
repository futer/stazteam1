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
    height = 250;
    @ViewChild('page') page: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        if (this.page.nativeElement.clientHeight < this.page.nativeElement.scrollHeight) {
            this.renderer.setStyle(
                this.page.nativeElement,
                'height',
                (this.height = this.height + 250) + 'vh'
            );
        }
    }

    constructor(
      private renderer: Renderer2
    ) {}

    ngOnInit() {}
}
