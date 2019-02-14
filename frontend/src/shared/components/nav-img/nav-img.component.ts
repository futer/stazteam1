import { Component, OnInit, Input } from '@angular/core';
import * as picUpload from '../../../shared/reusable-functions/pictureUpload';
import { DomSanitizer } from '@angular/platform-browser';


@Component({
  selector: 'app-nav-img',
  templateUrl: './nav-img.component.html',
  styleUrls: ['./nav-img.component.scss']
})
export class NavImgComponent implements OnInit {

  @Input() class: string;
  @Input() data;
  constructor( private sanitizer: DomSanitizer ) { }

  ngOnInit() {
  }

  getPic() {
   return  picUpload.getPic(this.data, this.sanitizer);
  }
}
