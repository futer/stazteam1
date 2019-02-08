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
    height = 250; flag = false;
    @ViewChild('page') page: ElementRef;
    @HostListener('document:keydown', ['$event']) onkeydownHandler(
        event: KeyboardEvent
    ) {
        // console.log(this.page.nativeElement.clientHeight, this.page.nativeElement.scrollHeight);
        if (this.page.nativeElement.clientHeight < this.page.nativeElement.scrollHeight) {
            console.log(this.page.nativeElement);
            this.renderer.setStyle(
                this.page.nativeElement,
                'height',
                (this.height = this.height + 250) + 'vh'
            );
        }
        if (this.page.nativeElement.clientWidth < this.page.nativeElement.scrollWidth && !this.flag) {
            // let textNode = this.page.nativeElement.firstChild;
            // let newTextNode = textNode.splitText(textNode.data.length - 2);
            this.flag = true;
            const br = this.renderer.createElement('br');
            const br2 = this.renderer.createElement('br');
            console.log(br);
            // br.appendChild(newTextNode);
            this.page.nativeElement.appendChild(br);
            this.page.nativeElement.appendChild(br2);

            const selection = window.getSelection();
            selection.collapse(this.page.nativeElement.childNodes[this.page.nativeElement.childNodes.length - 1], 0);
            console.log('wololo');
        }
    }

    constructor(
      private renderer: Renderer2
    ) {}

    ngOnInit() {}
}
