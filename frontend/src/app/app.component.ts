import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { Navigation } from 'selenium-webdriver';
import { Fetch } from 'src/user/store/user.actions';
import { Store } from '@ngrx/store';
import { State } from 'src/user/store/user.states';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'project1frontend';
  isActive: boolean;

constructor(private router: Router,
  private store: Store<State>) {}

ngOnInit() {
  this.router.events
  .pipe(filter ((event) => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
     if ( event.url === '/login' || event.url === '/register') {
       this.isActive = false;
     } else {
       this.store.dispatch(new Fetch);
       this.isActive = true;
     }
    console.log(this.isActive);
    });

  }


}

