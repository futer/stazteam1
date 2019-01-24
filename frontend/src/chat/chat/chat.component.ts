import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';

import { ChatService } from '../services/chat.service';

import { CommandEnum } from '../models/command.enum';
import { RoleEnum } from 'src/app/models/role.enum';
import { RegisteredEnum } from 'src/app/models/registered.enum';
import { BanEnum } from '../models/ban.enum';

import { UserModel } from 'src/app/models/user.model';
import { MessageModel } from '../models/message.model';
import { ContextMenuModel } from '../models/context-menu.model';
import { ContextMenuItemModel } from '../models/context-menu-item.model';

import { LoginLogoutCMDModel } from '../models/login-logout-cmd.model';
import { MessageCMDModel } from '../models/message-cmd.model';
import { BanCMDModel } from '../models/ban-cmd.model';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @Input() chatStyle: string;

  @ViewChild('messageComponent', { read: ElementRef }) messageComponent: ElementRef;
  @ViewChild('chatBar', { read: ElementRef }) chatBarComponent: ElementRef;

  loggedUser: UserModel;

  contexMenuPositionStyles: Object;
  contextMenu: ContextMenuModel;
  clickedMessage: MessageModel;

  messages: MessageModel[];

  chatIsHidden: boolean;
  userIsBanned: boolean;

  constructor(private chatService: ChatService) {
    this.chatStyle = '';

    this.loggedUser = <UserModel>{
      _id: '5c2cc322a47bf531845f2c3f',
      firstName: 'Test',
      lastName: 'Testowy',
      email: 'test@test.test',
      role: RoleEnum.MODERATOR,
      registered: RegisteredEnum.LOCAL,
      isBanned: true,
    };

    this.contexMenuPositionStyles = this.getContextMenuStyle();
    this.contextMenu = { items: [] };
    this.clickedMessage = null;

    this.messages = [];

    this.chatIsHidden = false;
    this.userIsBanned = false;

  }

  ngOnInit() {
    // this.userIsBanned = true;

    if (this.userIsBanned) {
      const msg = <MessageModel> {
        user: {
          id: this.loggedUser._id,
          firstName: this.loggedUser.firstName,
          lastName: this.loggedUser.lastName,
          isBanned: this.loggedUser.isBanned,
        },
        message: {
          isMessage: false,
          message: 'you are banned'
        }
      };

      this.messages.push(msg);

      return;
    }
  }

  public loginUser() {
    this.chatService.connect().subscribe(
      message => {
        this.chatService.handleCommand(this.messages, this.loggedUser, message);
      },
      err => console.log(err)
    );

    const loginMsg = this.getLoginLogoutCMDModel(this.loggedUser);

    this.chatService.sendMessage(loginMsg);
  }

  public logoutUser() {
    const logoutMsg = this.getLoginLogoutCMDModel(this.loggedUser, false);

    this.chatService.sendMessage(logoutMsg);
    this.chatService.disconncet();
  }

  private toggleChat() {
    this.chatIsHidden ? (this.chatIsHidden = false) : (this.chatIsHidden = true);
    // this.chatIsHidden ? (this.logoutUser()) : (this.loginUser());
  }

  private onMessage(message: string) {
    if (this.userIsBanned) { return; }

    const msg = <MessageCMDModel> {
      command: CommandEnum.MESSAGE,
      payload: {
        user: {
          id: this.loggedUser._id,
          firstName: this.loggedUser.firstName,
          lastName: this.loggedUser.lastName,
        },
        message: {
          message: message
        }
      }
    };

    this.chatService.sendMessage(msg);
  }

  private showContextMenu(data) {
    if (this.loggedUser.role !== RoleEnum.MODERATOR) { return; }

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

    this.contexMenuPositionStyles = this.getContextMenuStyle(
      event.layerY + chatBarHeight,
      event.layerX,
      'visible'
    );
  }

  private hideContextMenu() {
    this.clickedMessage = null;
    this.contexMenuPositionStyles = this.getContextMenuStyle();
  }

  private scrollToBottom() {
    if (this.clickedMessage) { return; }

    const nativeElement = this.messageComponent.nativeElement.children[0];

    nativeElement.scrollTop = nativeElement.scrollHeight - nativeElement.clientHeight + 1;
  }

  private contextMenuAction(data: any[]) {
    if (this.loggedUser.role !== RoleEnum.MODERATOR) { return; }

    const message = <MessageModel>data[0];
    const contextClickedItem = <ContextMenuItemModel>data[1];

    let commandMessage;

    switch (contextClickedItem.command) {
      case BanEnum.MESSAGE:
        commandMessage = this.getBanCMDModel(message.message.id, BanEnum.MESSAGE);
        break;
      case BanEnum.USER:
        commandMessage = this.getBanCMDModel(message.user.id, BanEnum.USER);
        break;
    }

    this.chatService.sendMessage(commandMessage);

    this.hideContextMenu();
  }

  private getContextMenuStyle(height: number = 0, width: number = 0, visibility: string = 'hidden') {
    return {
      position: 'absolute',
      top: `${height}px`,
      left: `${width}px`,
      visibility: visibility,
    };
  }

  private getBanCMDModel(id: string, ban: BanEnum) {
    return <BanCMDModel>{
      command: CommandEnum.BAN,
      payload: {
        id: id,
        ban: ban,
      }
    };
  }

  private getLoginLogoutCMDModel(loggedUser: UserModel, isLogin: boolean = true)  {
    let command;
    (isLogin) ? command = CommandEnum.LOGIN : command = CommandEnum.LOGOUT;

    return <LoginLogoutCMDModel> {
      command: command,
      payload: {
        user: {
          id: loggedUser._id,
          firstName: loggedUser.firstName,
          lastName: loggedUser.lastName,
        }
      },
    };
  }
}
