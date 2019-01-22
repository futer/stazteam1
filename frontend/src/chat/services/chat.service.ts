import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
import { MessageCMDModel } from '../models/message-cmd.model';

import { CommandCMDModel } from '../models/command-cmd.model';
import { CommandEnum } from '../models/command.enum';
import { TokenModel } from 'src/app/models/token.model';
import { MessageModel } from '../models/message.model';
import { BanEnum } from '../models/ban.enum';
import { BanCMDModel } from '../models/ban-cmd.model';
import { ShortMessageCMDModel } from '../models/short-message.model';
import { StatusEnum } from '../models/status.enum';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  private socket: WebSocketSubject<CommandCMDModel>;

  constructor() {
    this.socket = webSocket(environment.socketAddress);
  }

  getSocket(): WebSocketSubject<CommandCMDModel> {
    return this.socket;
  }

  handleCommand(messages: MessageModel[], token: TokenModel, message: CommandCMDModel) {
    switch (message.command) {
      case CommandEnum.MESSAGE:
        this.messageCommand(messages, message);
        break;
      case CommandEnum.LOGIN:
        this.loginCommand(token, messages);
        break;
      case CommandEnum.LOGOUT:
        this.logoutCommand(token, messages);
        break;
      case CommandEnum.BAN:
        this.banCommand(messages, message);
        break;
    }
  }

  messageCommand(messages: MessageModel[], message: CommandCMDModel) {
    const msg = <MessageCMDModel>message;

    const shortMessage = <ShortMessageCMDModel>message;
    if (shortMessage.payload.status === StatusEnum.SUCCESS) { return; }

    const msgModel: MessageModel = {
      user: msg.payload.user,
      message: {
        id: msg.payload.message.id,
        message: msg.payload.message.message,
        isMessage: true,
      }
    };

    messages.push(msgModel);
  }

  loginCommand(token: TokenModel, messages: MessageModel[]) {
    const msgModel: MessageModel = {
      user: {
        id: token._id,
        firstName: token.firstName,
        lastName: token.lastName,
      },
      message: {
        message: `${token.firstName} ${token.lastName} logged!`,
        isMessage: false,
      }
    };

    messages.push(msgModel);
  }

  logoutCommand(token: TokenModel, messages: MessageModel[]) {
    const msgModel: MessageModel = {
      user: {
        id: token._id,
        firstName: token.firstName,
        lastName: token.lastName,
      },
      message: {
        message: `${token.firstName} ${token.lastName} logout!`,
        isMessage: false,
      }
    };

    messages.push(msgModel);
  }

  banCommand(messages: MessageModel[], message: CommandCMDModel) {
    const msg = <BanCMDModel>message;

    switch (msg.payload.ban) {
      case BanEnum.MESSAGE:
        const idx = messages.findIndex(messageFromArray => Number(messageFromArray.message.id) === Number(msg.payload.id));
        if (idx >= 0) {
          messages[idx].message.isBanned = true;
          messages[idx].message.message = 'message removed';
        }
        break;
      case BanEnum.USER:
        const userMsg = messages.filter((mess) => mess.user.id === msg.payload.id && mess.message.isMessage);
        userMsg.forEach(messageFromArray => {
          messageFromArray.user.isBanned = true;
          messageFromArray.message.isBanned = true;
          messageFromArray.message.message = 'user banned';
        });
        break;
    }
  }

  sendMessage(message: CommandCMDModel): void {
    this.socket.next(message);
  }
}
