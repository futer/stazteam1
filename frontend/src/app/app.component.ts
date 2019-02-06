import { Component, OnInit, ViewChild } from '@angular/core';
import {  NavigationEnd, Router } from '@angular/router';
import {  filter } from 'rxjs/operators';
import { CoreState } from 'src/core/store';
import { Observable } from 'rxjs';
import * as fromStore from 'src/core/store/index';
import { Store } from '@ngrx/store';
import { AuthState } from '../core/store/auth/auth.state';
import { Reload } from '../core/store/auth/auth.actions';
import { User } from 'src/core/store/auth/auth.reducers';
import { ChatComponent } from 'src/chat/chat/chat.component';
import { UserModel } from './models/user.model';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit  {

  @ViewChild(ChatComponent, {read: ChatComponent}) chatComonent: ChatComponent;

  loggedUser: UserModel;

  title = 'project1frontend';
  isActive: boolean;
  bookmark$: Observable<any>;

constructor(
  private router: Router,
  private store: Store<any>
  ) {
    this.store.select(s => s).subscribe(auth => {
      const authStore = <AuthState> auth.auth;
      this.loggedUser = <UserModel>authStore.user;
      if (!this.loggedUser && this.chatComonent) {
        this.chatComonent.logoutUser();
      }
    });
  }

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
       });
       this.isActive = true;
     }
    });

    this.getBookmarks();
  }

  getBookmarks() {
   this.bookmark$ =  this.store.select(fromStore.getBookmarksSubpage);
  }
}

