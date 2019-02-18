import { Component } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-italic-btn',
  templateUrl: './italic-btn.component.html',
  styleUrls: ['./italic-btn.component.scss']
})
export class ItalicBtnComponent {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  toggleItalic() {
    this.textRef.observeText$.subscribe(ref => {
      document.execCommand('italic', false);
      ref.nativeElement.focus();
    }).unsubscribe();
  }
}
