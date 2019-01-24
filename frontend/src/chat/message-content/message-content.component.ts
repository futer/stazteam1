import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent implements OnInit {

  @Input() messageContentStyle: string;

  constructor() {
    this.messageContentStyle = '';
  }

  ngOnInit() {
  }

}
