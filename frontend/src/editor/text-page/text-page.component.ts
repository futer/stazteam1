import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-text-page',
  templateUrl: './text-page.component.html',
  styleUrls: ['./text-page.component.scss']
})
export class TextPageComponent implements OnInit {
  @Input() page: string;

  constructor() { }

  ngOnInit() {
    document.execCommand('DefaultParagraphSeparator', false, 'p');
    console.log(document.getElementById(this.page));
    document.getElementById(this.page)
      .addEventListener('keydown', function (e) {
        const curr = this;
        console.log(curr.offsetHeight, curr.scrollHeight);
        if (curr.offsetHeight < (curr.scrollHeight)) {
          console.log('oh yeah yeah');
        }
      });
  }

}
