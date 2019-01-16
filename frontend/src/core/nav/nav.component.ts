import { Component, OnInit } from '@angular/core';
import { NavService } from '../services/nav/nav.service';
import { AuthService } from '../services/auth/auth.service';
import { Store } from '@ngrx/store';
import { AuthState } from '../store/auth.state';
import { Logout } from '../store/auth.actions';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit {


  constructor (private authService: AuthService,
    private store: Store<AuthState>) { }

  ngOnInit() {

  }

  logOut() {
    // this.authService.removeToken();
    this.store.dispatch(new Logout);

  }

}
