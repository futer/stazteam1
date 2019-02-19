import { Component, Input } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-user-message-info',
  templateUrl: './user-message-info.component.html',
  styleUrls: ['./user-message-info.component.scss']
})
export class UserMessageInfoComponent {

  @Input() userMessageInfoStyle: string;
  @Input() pic: string;

  constructor(
    private sanitizer: DomSanitizer,
  ) {
    this.userMessageInfoStyle = '';
    this.pic = '';
  }

  getPic() {
    if (this.pic) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${this.pic}`);
    }

    return '../..//assets/img/avatar.png';
  }
}
