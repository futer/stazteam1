import { Component, OnInit } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { CoreState } from 'src/core/store';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/core/store/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {
  title = 'project1frontend';
  isActive: boolean;
  bookmark$: Observable<any>;

constructor(private router: Router,
    private store: Store<CoreState>) {}

ngOnInit() {
  this.router.events
  .pipe(filter ((event) => event instanceof NavigationEnd))
  .subscribe((event: NavigationEnd) => {
     if ( event.url === '/login' || event.url === '/register') {
       this.isActive = false;
     } else {
       this.isActive = true;
     }
    });

    this.getBookmarks();


  }

  getBookmarks() {
   this.bookmark$ =  this.store.select(fromStore.getBookmarksSubpage);
  }


}

