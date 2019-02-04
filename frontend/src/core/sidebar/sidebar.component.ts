import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '../store';
import * as fromStore from '../../core/store/index';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { Router } from '@angular/router';
import { Observable } from 'apollo-link';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  @Input() bookmark$: Observable<any>;

  constructor(private store: Store<CoreState>,
    private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new bookmarkActions.FetchBookmark);
  }

  navigateToSubpage(title) {
    this.router.navigate(['/subpage', title]);
  }

  navigateToFav() {
    this.router.navigate(['/favourites']);
  }
}
