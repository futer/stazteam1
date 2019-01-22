import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

import { ContextMenuModel } from '../models/context-menu.model';
import { MessageModel } from '../models/message.model';

@Component({
  selector: 'app-chat-context-menu',
  templateUrl: './chat-context-menu.component.html',
  styleUrls: ['./chat-context-menu.component.scss']
})
export class ChatContextMenuComponent implements OnInit {

  @Input() appChatContextMenuStyles: string;
  @Input() contexMenuPositionStyles: Object;
  @Input() clickedMessage: MessageModel;
  @Input() contextMenu: ContextMenuModel;

  @Output() contextMenuItemEmitter = new EventEmitter<any[]>();

  constructor() {
    this.appChatContextMenuStyles = '';
    this.contexMenuPositionStyles = {};
    this.clickedMessage = { message: null, user: null };
    this.contextMenu = { items: [] };
   }

  ngOnInit() {
  }

  onClick(contextMenuItem: ContextMenuModel) {
    this.contextMenuItemEmitter.emit([this.clickedMessage, contextMenuItem]);
  }

  donotShowDefaultContextMenu() {
    return false;
  }
}
