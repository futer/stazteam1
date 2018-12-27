import { Component , EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit-btn',
  templateUrl: './submit-btn.component.html',
  styleUrls: ['./submit-btn.component.scss']
})
export class SubmitBtnComponent {
  @Input() buttonStyle: string;
  @Input() type?: string;
  @Input() disabled?: boolean;

  @Output() click?: any = new EventEmitter<any>();

  constructor() {}

  onClickEvent(event) {
    this.click.emit(event);
  }
}
