import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormControl } from '@angular/forms';


@Component({
  selector: 'app-radio-buttons',
  templateUrl: './radio-buttons.component.html',
  styleUrls: ['./radio-buttons.component.scss']
})
export class RadioButtonsComponent {

  @Input() id: string;
  @Input() name: string;
  @Input() controlName: FormControl;

  selected = '';
  @Output() radioButtonChange = new EventEmitter();

  setradio(e: string) {
    this.selected = e;
  }

   onRadioChange() {
     this.radioButtonChange.emit(this.selected);
  }
}
