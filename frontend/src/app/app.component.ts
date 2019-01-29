import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/store/auth/auth.state';
import { Reload } from '../core/store/auth/auth.actions';
import { User } from 'src/core/store/auth/auth.reducers';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'project1frontend';
  isActive: boolean;

constructor(private router: Router,
  private store: Store<any>) {}

ngOnInit() {
  this.router.events
  .pipe(filter ((event) => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
    let shouldIReload = false;
     if ( event.url === '/login' || event.url === '/register') {
       this.isActive = false;
     } else {
       this.store.select(u => u).subscribe(a => {
         const auth = <AuthState>a.auth;
         if (!auth.user && !shouldIReload) {
           this.store.dispatch(new Reload());
           shouldIReload = true;
         }
         this.isActive = true;
       });
     }
    });

  }


}

