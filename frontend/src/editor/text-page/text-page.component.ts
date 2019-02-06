import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit {
  container = document.getElementsByClassName('container');

  constructor() { }

  ngOnInit() {
    document.execCommand('DefaultParagraphSeparator', false, 'p');

    console.log(this.container);
  }

}
