import { Component } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-bold-btn',
  templateUrl: './bold-btn.component.html',
  styleUrls: ['./bold-btn.component.scss']
})
export class BoldBtnComponent {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  toggleBold() {
    this.textRef.observeText$.subscribe(ref => {
      document.execCommand('bold', false);
      ref.nativeElement.focus();
    }).unsubscribe();
  }
}
