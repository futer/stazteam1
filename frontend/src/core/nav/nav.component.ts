import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav/nav.service';
import { AuthService } from '../services/auth/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor() { }

  ngOnInit() {

  }


}
