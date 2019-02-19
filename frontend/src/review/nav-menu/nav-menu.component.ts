import {
  Component,
  OnInit,
  Input,
  Output,
  EventEmitter
} from '@angular/core';
import { StatusEnum } from '../models/status.enum';

@Component({
  selector: 'app-nav-menu',
  templateUrl: './nav-menu.component.html',
  styleUrls: ['./nav-menu.component.scss']
})
export class NavMenuComponent implements OnInit {

  @Input() navMenuStyle: string;
  @Output() clickedEmitter = new EventEmitter<StatusEnum>();

  clickedTab: StatusEnum;

  constructor() {
    this.navMenuStyle = '';
    this.clickedTab = StatusEnum.ACCEPTED;
  }

  ngOnInit() {
    this.clickedEmitter.emit(this.clickedTab);
  }

  onClick(clicked: StatusEnum) {
    if (this.clickedTab === clicked) { return; }

    this.clickedTab = clicked;
    this.clickedEmitter.emit(this.clickedTab);
  }
}
