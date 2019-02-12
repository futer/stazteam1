import { Component, OnInit, Input } from '@angular/core';
import { MarkedTextModel } from '../models/marked-text.model';

@Component({
  selector: 'app-marked-text',
  templateUrl: './marked-text.component.html',
  styleUrls: ['./marked-text.component.scss']
})
export class MarkedTextComponent implements OnInit {

  @Input() markedText: MarkedTextModel[];

  constructor() { }

  ngOnInit() {
  }

}
