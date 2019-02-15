import { Component, OnInit, Renderer2 } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
    selector: 'app-cite-btn',
    templateUrl: './cite-btn.component.html',
    styleUrls: ['./cite-btn.component.scss']
})
export class CiteBtnComponent implements OnInit {
    constructor(
        private rendered: Renderer2,
        private textRef: ToolboxActionsService
    ) {}

    ngOnInit() {}

    toggleQuoteMarks() {
        const sel = window.getSelection().getRangeAt(0);
        sel.startContainer['data'] =
            sel.startContainer['data'].slice(0, sel.startOffset) +
            '"' +
            sel.startContainer['data'].slice(sel.startOffset);
        sel.endContainer['data'] =
            sel.endContainer['data'].slice(0, sel.endOffset) +
            '"' +
            sel.endContainer['data'].slice(sel.endOffset);

        document.getSelection().empty();
    }
}
