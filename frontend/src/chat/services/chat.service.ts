import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';

import { BanEnum } from '../models/ban.enum';
import { StatusEnum } from '../models/status.enum';
import { CommandEnum } from '../models/command.enum';

import { UserModel } from 'src/app/models/user.model';
import { MessageModel } from '../models/message.model';

import { MessageCMDModel } from '../models/message-cmd.model';
import { CommandCMDModel } from '../models/command-cmd.model';
import { BanCMDModel } from '../models/ban-cmd.model';
import { ShortMessageCMDModel } from '../models/short-message.model';
import { LoginLogoutCMDModel } from '../models/login-logout-cmd.model';
import { AuthService } from '../../core/services/auth/auth.service';

import { AuthState } from '../../core/store/auth/auth.state';
import { Reload } from '../../core/store/auth/auth.actions';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root'
})
export class ChatService {

  socket: WebSocketSubject<CommandCMDModel>;

  constructor(
    private authService: AuthService,
    private store: Store<AuthState>,
  ) { }

  connect(): WebSocketSubject<CommandCMDModel> {
    this.socket = webSocket({
      url: environment.socketAddress,
      protocol: localStorage.getItem('token'),
      closeObserver: {
        next(closeEvent) { }
      },
    });

    return this.socket;
  }

  disconncet() {
    this.socket.unsubscribe();
  }

  handleCommand(messages: MessageModel[], loggedUser: UserModel, message: CommandCMDModel) {
    switch (message.command) {
      case CommandEnum.MESSAGE:
        this.messageCommand(messages, message);
        break;
      case CommandEnum.LOGIN:
        this.loginCommand(messages, message);
        break;
      case CommandEnum.LOGOUT:
        this.logoutCommand(messages, message);
        break;
      case CommandEnum.BAN:
        this.banCommand(messages, loggedUser, message);
        break;
    }
  }

  messageCommand(messages: MessageModel[], message: CommandCMDModel) {
    const shortMsg = <ShortMessageCMDModel> message;
    const msg = <MessageCMDModel>message;
    let msgModel;
    if (msg.payload.user !== undefined) {
       msgModel = {
        user: msg.payload.user,
        message: {
          id: msg.payload.message.id,
          message: msg.payload.message.message,
          isMessage: true,
        }
      };
      messages.push(msgModel);
      return;
    }

    switch (shortMsg.payload.status) {
      case StatusEnum.SUCCESS:
      msgModel = {
        message: {
          message: shortMsg.payload.message,
          isMessage: false,
        }
      };
      break;
      case StatusEnum.ERROR:
      msgModel = {
        message: {
          message: shortMsg.payload.message,
          isMessage: false,
        }
      };
      break;
    }
    messages.push(msgModel);
  }

  loginCommand(messages: MessageModel[], message: CommandCMDModel) {
    const msg = <LoginLogoutCMDModel>message;

    const msgModel: MessageModel = {
      user: {
        id: msg.payload.user.id,
        firstName: msg.payload.user.firstName,
        lastName: msg.payload.user.lastName,
      },
      message: {
        message: `${msg.payload.user.firstName} ${msg.payload.user.lastName} logged!`,
        isMessage: false,
      }
    };

    messages.push(msgModel);
  }

  logoutCommand(messages: MessageModel[], message: CommandCMDModel) {
    const msg = <LoginLogoutCMDModel>message;

    const msgModel: MessageModel = {
      user: {
        id: msg.payload.user.id,
        firstName: msg.payload.user.firstName,
        lastName: msg.payload.user.lastName,
      },
      message: {
        message: `${msg.payload.user.firstName} ${msg.payload.user.lastName} logout!`,
        isMessage: false,
      }
    };

    messages.push(msgModel);
  }

  banCommand(messages: MessageModel[], user: UserModel, message: CommandCMDModel) {
    const msg = <BanCMDModel>message;
    switch (msg.payload.ban) {
      case BanEnum.MESSAGE:
        this.banMessage(messages, msg);
        break;
      case BanEnum.USER:
        this.banUser(messages, user, msg);
        break;
    }
  }

  sendMessage(message: CommandCMDModel): void {
    this.socket.next(message);
  }

  private banMessage(messages: MessageModel[], message: BanCMDModel) {
    const idx = messages.findIndex(messageFromArray => Number(messageFromArray.message.id) === Number(message.payload.id));
    if (idx >= 0) {
      messages[idx].message.isBanned = true;
      messages[idx].message.message = 'message removed';
    }
  }

  private banUser(messages: MessageModel[], user: UserModel, message: BanCMDModel) {
    const userMsg = messages.filter((mess) => mess.message.isMessage && mess.user.id === message.payload.id);
    userMsg.forEach(messageFromArray => {
      messageFromArray.user.isBanned = true;
      messageFromArray.message.isBanned = true;
      messageFromArray.message.message = 'user banned';
    });

    if (user._id === message.payload.id) {
      this.store.dispatch(new Reload);
      const msg = <MessageModel> {
        user: {
          id: user._id,
          firstName: user.firstName,
          lastName: user.lastName,
          isBanned: user.isBanned,
        },
        message: {
          isMessage: false,
          message: 'you are banned'
        }
      };

      this.disconncet();

      messages.push(msg);
    }
  }
}
