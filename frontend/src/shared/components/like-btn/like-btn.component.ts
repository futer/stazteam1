import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-like-btn',
  templateUrl: './like-btn.component.html',
  styleUrls: ['./like-btn.component.scss']
})
export class LikeBtnComponent implements OnInit {
  @Input() buttonStyle: string;
  @Input() isChecked: boolean;
  constructor() { }

  ngOnInit() {
  }

}
