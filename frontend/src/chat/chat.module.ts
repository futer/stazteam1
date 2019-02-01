import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from 'src/shared/shared.module';

import { ChatComponent } from './chat/chat.component';
import { ChatBarComponent } from './chat-bar/chat-bar.component';
import { MessageComponent } from './message/message.component';
import { MessageContentComponent } from './message-content/message-content.component';
import { UserMessageInfoComponent } from './user-message-info/user-message-info.component';
import { ChatContextMenuComponent } from './chat-context-menu/chat-context-menu.component';
import { SendMessageComponent } from './send-message/send-message.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    ChatComponent,
    ChatBarComponent,
    MessageComponent,
    MessageContentComponent,
    UserMessageInfoComponent,
    ChatContextMenuComponent,
    SendMessageComponent,
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
  ],
  exports: [
    ChatComponent,
  ]
})
export class ChatModule { }
