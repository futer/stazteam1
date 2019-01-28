import { Component, OnInit, Input } from '@angular/core';
import { FormControl } from '@angular/forms';
import { tick } from '@angular/core/testing';
import { Title } from '@angular/platform-browser';

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

  constructor() { }

  ngOnInit() {
  }

}
