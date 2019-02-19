import { Component, Input } from '@angular/core';
import * as picUpload from '../../../shared/reusable-functions/pictureUpload';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-nav-img',
  templateUrl: './nav-img.component.html',
  styleUrls: ['./nav-img.component.scss']
})
export class NavImgComponent {

  @Input() class: string;
  @Input() data;
  constructor( private sanitizer: DomSanitizer ) { }

  getPic() {
   return  picUpload.getPic(this.data, this.sanitizer);
  }
}
