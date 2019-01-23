import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { Navigation } from 'selenium-webdriver';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'project1frontend';
  isActive: boolean;

constructor(private router: Router) {}

ngOnInit() {
  this.router.events
  .pipe(filter ((event) => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
     if ( event.url === '/login' || event.url === '/register') {
       this.isActive = false;
     } else {
       this.isActive = true;
     }
    // console.log(this.isActive);
    });

  }


}

