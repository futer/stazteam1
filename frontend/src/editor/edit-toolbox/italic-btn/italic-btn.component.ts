import { Component, OnInit } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-italic-btn',
  templateUrl: './italic-btn.component.html',
  styleUrls: ['./italic-btn.component.scss']
})
export class ItalicBtnComponent implements OnInit {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  ngOnInit() {
  }

  toggleItalic() {
    this.textRef.textSource.subscribe(ref => {
      document.execCommand('italic', false);
      ref.nativeElement.focus();
    }).unsubscribe();
  }
}
