import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-router-btn',
  templateUrl: './router-btn.component.html',
  styleUrls: ['./router-btn.component.scss']
})
export class RouterBTNComponent {
  @Input() routerLink: string;
  @Input() class: string;

  constructor() { }

}
