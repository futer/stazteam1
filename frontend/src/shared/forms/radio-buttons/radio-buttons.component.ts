import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  constructor() { }

  ngOnInit() {
  }

}
