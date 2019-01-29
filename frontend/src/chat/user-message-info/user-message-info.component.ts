import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-user-message-info',
  templateUrl: './user-message-info.component.html',
  styleUrls: ['./user-message-info.component.scss']
})
export class UserMessageInfoComponent implements OnInit {

  @Input() userMessageInfoStyle = '';

  constructor() { }

  ngOnInit() {
  }

}
