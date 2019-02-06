import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-review-doc',
  templateUrl: './review-doc.component.html',
  styleUrls: ['./review-doc.component.scss']
})
export class ReviewDocComponent implements OnInit {

  id: string;

  constructor(
    private route: ActivatedRoute,
  ) {
    this.id = this.route.snapshot.paramMap.get('id');
  }

  ngOnInit() {

  }

}
