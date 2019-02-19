import { Component, Input } from '@angular/core';
import { MarkedTextModel } from '../models/marked-text.model';

@Component({
  selector: 'app-marked-text',
  templateUrl: './marked-text.component.html',
  styleUrls: ['./marked-text.component.scss']
})
export class MarkedTextComponent {

  @Input() markedText: MarkedTextModel[];
  @Input() markedTextStyle: string;

  constructor() {
    this.markedText = [];
    this.markedTextStyle = '';
  }
}
