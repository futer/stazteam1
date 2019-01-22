import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from '../services/chat.service';
import { CommandEnum } from '../models/command.enum';
import { MessageModel } from '../models/message.model';
import { MessageCMDModel } from '../models/message-cmd.model';

import { TokenModel } from '../../app/models/token.model';
import { RoleEnum } from 'src/app/models/role.enum';
import { RegisteredEnum } from 'src/app/models/registered.enum';
import { LoginCMDModel } from '../models/login-cmd.model';
import { ContextMenuModel } from '../models/context-menu.model';
import { ContextMenuItemModel } from '../models/context-menu-item.model';
import { BanCMDModel } from '../models/ban-cmd.model';
import { BanEnum } from '../models/ban.enum';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  token: TokenModel;

  contexMenuPositionStyles: Object;
  contextMenu: ContextMenuModel;
  clickedMessage: MessageModel;

  @Input() chatStyle = '';
  messages: MessageModel[];
  hidden = false;

  @ViewChild('messageComponent', { read: ElementRef }) messageComponent: ElementRef;
  @ViewChild('chatBar', { read: ElementRef }) chatBarComponent: ElementRef;

  constructor(private chatService: ChatService) {
    this.messages = [];

    this.token = {
      _id: '5c2cc322a47bf531845f2c3f',
      firstName: 'Test',
      lastName: 'Testowy',
      email: 'test@test.test',
      role: RoleEnum.USER,
      registered: RegisteredEnum.LOCAL,
      isBanned: true,
    };

    this.contextMenu = { items: [] };

    this.hideContextMenu();
  }

  ngOnInit() {
    this.chatService.getSocket().subscribe(
      message => {
        this.chatService.handleCommand(this.messages, this.token, message);
      },
      err => console.log(err)
    );

    const loginMsg = <LoginCMDModel> {
      command: CommandEnum.LOGIN,
      payload: {
        user: {
          id: this.token._id,
          firstName: this.token.firstName,
          lastName: this.token.lastName,
        }
      },
    };

    this.chatService.sendMessage(loginMsg);
  }

  toggleChat() {
    this.hidden ? (this.hidden = false) : (this.hidden = true);
  }

  onMessage(message: string) {
    const msg = <MessageCMDModel> {
      command: CommandEnum.MESSAGE,
      payload: {
        user: {
          id: this.token._id,
          firstName: this.token.firstName,
          lastName: this.token.lastName,
        },
        message: {
          message: message
        }
      }
    };

    this.chatService.sendMessage(msg);
  }

  showContextMenu(data) {
    this.clickedMessage = <MessageModel>data[0];
    this.contextMenu = {
      items: [{
        command: BanEnum.USER,
        value: 'ban user',
        classDisabled: (this.clickedMessage.user.isBanned) ? 'disabled' : '',
      }, {
        command: BanEnum.MESSAGE,
        value: 'ban message',
        classDisabled: (this.clickedMessage.message.isBanned) ? 'disabled' : '',
      }]
    };

    const chatBarHeight = this.chatBarComponent.nativeElement.children[0].clientHeight;
    const event: MouseEvent = data[1];
    this.contexMenuPositionStyles = {
      position: 'absolute',
      top: `${event.layerY + chatBarHeight}px`,
      left: `${event.layerX}px`,
      visibility: 'visible',
    };
  }

  hideContextMenu() {
    this.clickedMessage = null;
    this.contexMenuPositionStyles = {
      position: 'absolute',
      top: '-100px',
      left: '-100px',
      visibility: 'hidden',
    };
  }

  scrollToBottom() {
    if (this.clickedMessage) { return; }

    const nativeElement = this.messageComponent.nativeElement.children[0];

    nativeElement.scrollTop = nativeElement.scrollHeight - nativeElement.clientHeight + 1;
  }

  contextMenuAction(data: any[]) {
    const message = <MessageModel>data[0];
    const contextClickedItem = <ContextMenuItemModel>data[1];

    let commandMessage;

    switch (contextClickedItem.command) {
      case BanEnum.MESSAGE:
        commandMessage = <BanCMDModel>{
          command: CommandEnum.BAN,
          payload: {
            id: message.message.id,
            ban: BanEnum.MESSAGE,
          }
        };
        break;
      case BanEnum.USER:
        commandMessage = <BanCMDModel>{
          command: CommandEnum.BAN,
          payload: {
            id: message.user.id,
            ban: BanEnum.USER,
          }
        };
        break;
    }

    this.chatService.sendMessage(commandMessage);

    this.hideContextMenu();
  }
}
