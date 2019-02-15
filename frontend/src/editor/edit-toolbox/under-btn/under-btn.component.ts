import { Component, OnInit } from '@angular/core';
import { ToolboxActionsService } from 'src/editor/services/toolbox-actions.service';

@Component({
  selector: 'app-under-btn',
  templateUrl: './under-btn.component.html',
  styleUrls: ['./under-btn.component.scss']
})
export class UnderBtnComponent implements OnInit {

  constructor(
    private textRef: ToolboxActionsService
  ) { }

  ngOnInit() {
  }

  toggleUnderline() {
    this.textRef.textSource.subscribe(ref => {
      document.execCommand('underline', false);
      ref.nativeElement.focus();
      console.log(ref);
    }).unsubscribe();
  }
}
