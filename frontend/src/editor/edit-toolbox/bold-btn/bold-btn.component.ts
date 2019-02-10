import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-bold-btn',
  templateUrl: './bold-btn.component.html',
  styleUrls: ['./bold-btn.component.scss']
})
export class BoldBtnComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  toggleBold() {
    document.execCommand('bold', false);
  }
}
