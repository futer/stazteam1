import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/store/auth.state';
import { Reload } from 'src/core/store/auth.actions';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'project1frontend';
  isActive: boolean;

constructor(private router: Router,
  private store: Store<AuthState>) {}

ngOnInit() {
  this.router.events
  .pipe(filter ((event) => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
     if ( event.url === '/login' || event.url === '/register') {
       this.isActive = false;
     } else{
       this.store.dispatch(new Reload());
       this.isActive = true;
     }
    console.log(this.isActive);
    });

  }


}

