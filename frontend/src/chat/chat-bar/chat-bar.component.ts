import {
  Component,
  OnInit,
  Input
} from '@angular/core';

@Component({
  selector: 'app-chat-bar',
  templateUrl: './chat-bar.component.html',
  styleUrls: ['./chat-bar.component.scss']
})
export class ChatBarComponent implements OnInit {

  @Input() chatBarStyle: string;

  constructor() {
    this.chatBarStyle = '';
  }

  ngOnInit() {
  }

}
