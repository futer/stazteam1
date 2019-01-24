import { Component, OnInit, ViewChild } from '@angular/core';
import { ChatComponent } from 'src/chat/chat/chat.component';

@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {

  @ViewChild(ChatComponent, {read: ChatComponent}) chatComonent: ChatComponent;

  constructor() { }

  ngOnInit() {
    this.chatComonent.loginUser();
  }
}
