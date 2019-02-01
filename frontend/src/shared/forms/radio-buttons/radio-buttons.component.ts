import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormBuilder, FormGroup, Validators } from '@angular/forms';


@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent implements OnInit {

  @Input() id: string;
  @Input() name: string;
  @Input() type: string;
  @Input() controlName: FormControl;
  @Input() value1: string;
  @Input() value2: string;

  positions =  {'right': 'RIGHT',  'top': 'TOP'};
  selected = '';

  @Output() radioButtonChange = new EventEmitter();

  constructor() {
   }
  ngOnInit() {

  }


  setradio(e: string) {
    this.selected = e;
   }

   onRadioChange() {
     this.radioButtonChange.emit(this.selected);
   }

}
