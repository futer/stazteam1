import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() id ? = '';
  @Input() formInputStyle: string;
  @Input() controlName: FormControl;
  @Input() placeholder = '';
  @Input() type?: string;
  @Input() accept?: string;
  @Input() value ? = '';
  @Input() name ?= '';
  @Input() checked ?: boolean;

  @Output() changeValue = new EventEmitter();


  constructor() { }

  ngOnInit() {

  }

  change() {
    this.changeValue.emit(this.value);
  }


}
