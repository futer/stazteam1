import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter,
  AfterViewChecked
} from '@angular/core';

import { MessageModel } from '../models/message.model';

@Component({
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss']
})
export class MessageComponent implements OnInit, AfterViewChecked {

  @Input() messages: MessageModel[];
  @Input() messageStyle: string;
  @Input() isMessage: boolean;

  @Output() scrollToBottomEmitter = new EventEmitter();
  @Output() scrollEventEmitter = new EventEmitter();
  @Output() showContextMenuEmitter = new EventEmitter<any[]>();

  private messagesLength: number;

  constructor() {
    this.messages = [];
    this.messageStyle = '';
    this.isMessage = true;

    this.messagesLength = 0;
  }

  ngOnInit() {
  }

  ngAfterViewChecked() {
    if (this.messagesLength !== this.messages.length) {
      this.messagesLength = this.messages.length;
      this.scrollToBottomEmitter.emit();
    }
  }

  onClick(message: MessageModel, event: any) {
    if (message.message.isMessage) {
      this.showContextMenuEmitter.emit([message, event]);
    }

    return false;
  }

  onScroll() {
    this.scrollEventEmitter.emit();
  }
}
