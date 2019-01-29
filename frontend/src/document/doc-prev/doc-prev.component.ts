import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-doc-prev',
  templateUrl: './doc-prev.component.html',
  styleUrls: ['./doc-prev.component.scss']
})
export class DocPrevComponent implements OnInit {
  @Input() preview;

  constructor() { }

  ngOnInit() {

  }
}
