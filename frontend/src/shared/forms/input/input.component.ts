import { Component, OnInit, Input, SimpleChanges, OnChanges, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit, OnChanges {
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

  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes);
    this.change();
  }

  change() {
    this.changeValue.emit(this.value);
  }


}
