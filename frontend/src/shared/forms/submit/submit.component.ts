import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-submit',
  templateUrl: './submit.component.html',
  styleUrls: ['./submit.component.scss']
})
export class SubmitComponent {
  @Input() value: string;
  @Input() buttonStyle: string;
  @Input() type?: string;
  @Input() disabled?: boolean;

  @Output() click?: any = new EventEmitter<any>();

  constructor() {}

  onClickEvent(event) {
    this.click.emit(event);
  }
}
