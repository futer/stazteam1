import { Component, OnInit } from '@angular/core';
import { StatusEnum } from '../models/status.enum';

@Component({
  selector: 'app-review',
  templateUrl: './review.component.html',
  styleUrls: ['./review.component.scss']
})
export class ReviewComponent implements OnInit {

  message: string;

  constructor() {
    this.message = '';
  }

  ngOnInit() {
  }

  clickedTab(clicked: StatusEnum) {
    this.message = clicked;
    console.log(this.message);
  }
}
