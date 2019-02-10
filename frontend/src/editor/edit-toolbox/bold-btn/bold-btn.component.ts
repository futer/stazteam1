import { Component, OnInit } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-bold-btn',
  templateUrl: './bold-btn.component.html',
  styleUrls: ['./bold-btn.component.scss']
})
export class BoldBtnComponent implements OnInit {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  ngOnInit() {
  }

  toggleBold() {
    this.textRef.textSource.subscribe(ref => {
      document.execCommand('bold', false);
      ref.nativeElement.focus();
    }).unsubscribe();
  }
}
