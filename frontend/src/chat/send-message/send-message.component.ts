import { Component, OnInit, EventEmitter, Output, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'app-send-message',
    templateUrl: './send-message.component.html',
    styleUrls: ['./send-message.component.scss']
})
export class SendMessageComponent implements OnInit {

    @Input() sendMessageStyles = '';

    sendMessageForm: FormGroup;
    @Output() messageEmitter = new EventEmitter<string>();

    constructor(private formBuilder: FormBuilder) {}

    ngOnInit() {
        this.sendMessageForm = this.formBuilder.group({
            message: ['', [Validators.required]]
        });
    }

    send(sendMessageForm) {
        const message = sendMessageForm.value.message.trim();

        if (message === '') { return; }

        this.messageEmitter.emit(message);
        this.sendMessageForm.setValue({ message: '' });
    }
}
