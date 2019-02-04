import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {

  selected: string;

  constructor() {
  }

  ngOnInit() {
  }

  getAcivateRole(value) {
    this.selected = value;
  }
}
