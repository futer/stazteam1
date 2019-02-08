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
        if (this.page.nativeElement.clientWidth < this.page.nativeElement.scrollWidth) {
            const textNode = this.page.nativeElement.childNodes[this.page.nativeElement.childNodes.length - 2];
            const newTextNode = textNode.splitText(textNode.data.length - 1);

            const br = this.renderer.createElement('br');

            this.page.nativeElement.appendChild(newTextNode);
            this.page.nativeElement.appendChild(br);

            const selection = window.getSelection();
            selection.collapse(this.page.nativeElement.childNodes[this.page.nativeElement.childNodes.length - 2], 1);
        }
    }

    constructor(
      private renderer: Renderer2
    ) {}

    ngOnInit() {}
}
