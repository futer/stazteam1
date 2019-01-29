import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-send-message',
  templateUrl: './send-message.component.html',
  styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

  @Input() sendMessageStyles: string;
  @Input() userIsBanned: boolean;

  @Output() messageEmitter = new EventEmitter<string>();

  sendMessageForm: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.sendMessageStyles = '';
    this.userIsBanned = false;
  }

  ngOnInit() {
    this.sendMessageForm = this.formBuilder.group({
      message: [{
        value: '',
        disabled: this.userIsBanned
      }, [
        Validators.required
      ]
    ]});
  }

  send(sendMessageForm) {
    const message = sendMessageForm.value.message.trim();

    if (message === '') { return; }

    this.messageEmitter.emit(message);
    this.sendMessageForm.setValue({ message: '' });
  }
}
