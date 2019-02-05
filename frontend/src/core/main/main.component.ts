import { Component, OnInit } from '@angular/core';
import { AuthService as SocialMediaAuthService, SocialUser  } from 'angularx-social-login';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {


  constructor(
    private socialMediaAuthService: SocialMediaAuthService
  ) { }

  ngOnInit() {

  }

}
