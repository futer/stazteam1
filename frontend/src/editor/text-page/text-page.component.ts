import {
    Component,
    OnInit,
    ViewChild,
    ElementRef,
    HostListener,
    Renderer2,
} from '@angular/core';
import { ToolboxActionsService } from '../services/toolbox-actions.service';

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
        if (this.page.nativeElement.clientHeight < this.page.nativeElement.scrollHeight) {
            this.renderer.setStyle(
                this.page.nativeElement,
                'height',
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
    }
}