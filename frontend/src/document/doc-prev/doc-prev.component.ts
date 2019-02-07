import { Component, OnInit, Input } from '@angular/core';
import { PrefixNot } from '@angular/compiler';

@Component({
  selector: 'app-doc-prev',
  templateUrl: './doc-prev.component.html',
  styleUrls: ['./doc-prev.component.scss']
})
export class DocPrevComponent implements OnInit {
  @Input() preview;
  @Input() prefixAddress;

  constructor() { }

  ngOnInit() {

  }
}
