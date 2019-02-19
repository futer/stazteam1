import { Component } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-under-btn',
  templateUrl: './under-btn.component.html',
  styleUrls: ['./under-btn.component.scss']
})
export class UnderBtnComponent {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  toggleUnderline() {
    this.textRef.observeText$.subscribe(ref => {
      document.execCommand('underline', false);
      ref.nativeElement.focus();
    }).unsubscribe();
  }
}
