import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';


@Component({
  selector: 'app-button',
  templateUrl: './button.component.html',
  styleUrls: ['./button.component.scss']
})
export class ButtonComponent implements OnInit {
  @Input() class: string;
  @Input() disabled: boolean;

  @Output() clickEvent = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  clickedEvent($event) {
    this.clickEvent.emit($event);
  }

}
