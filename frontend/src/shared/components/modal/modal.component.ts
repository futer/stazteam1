import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {ModalAnimation} from '../../animations/modal-animation';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss'],
  animations: [
     ModalAnimation
  ]
})
export class ModalComponent implements OnInit {
  @Input() visible: boolean;
  @Output() visibleChange: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit() {
  }

  close() {
    this.visible = false;
    this.visibleChange.emit(this.visible);
  }

}
