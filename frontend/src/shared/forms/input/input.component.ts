import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss']
})
export class InputComponent implements OnInit {
  @Input() id ? = '';
  @Input() controlName: FormControl;
  @Input() placeholder = '';
  @Input() type?: string;
  @Input() formInputStyle: string;
  @Input() accept: string;

  constructor() { }

  ngOnInit() {
  }

}
