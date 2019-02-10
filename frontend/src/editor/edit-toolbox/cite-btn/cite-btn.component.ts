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
  ) { }

  ngOnInit() {
  }

  toggleQuoteMarks() {
    this.textRef.textSource.subscribe(ref => {
      // TODO
      console.log(window.getSelection().getRangeAt(0));
    }).unsubscribe();
  }
}
