import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-doc-prev',
  templateUrl: './doc-prev.component.html',
  styleUrls: ['./doc-prev.component.scss']
})
export class DocPrevComponent {
  @Input() preview: any;
  @Input() prefixAddress: string;

  constructor() { }
}
