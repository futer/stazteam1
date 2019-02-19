import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-message-content',
  templateUrl: './message-content.component.html',
  styleUrls: ['./message-content.component.scss']
})
export class MessageContentComponent {

  @Input() messageContentStyle: string;

  constructor() {
    this.messageContentStyle = '';
  }
}
