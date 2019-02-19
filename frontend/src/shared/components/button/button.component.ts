import { Component, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent {
  @Input() class: string;
  @Input() disabled: boolean;

  @Output() clickEvent = new EventEmitter();

  clickedEvent($event) {
    this.clickEvent.emit($event);
  }
}
