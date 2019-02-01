import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { CoreState } from '../store';
import * as fromStore from '../../core/store/index';
import * as bookmarkActions from '../../core/store/bookmark/bookmark.actions';
import { Router } from '@angular/router';


@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
  bookmark$: any = this.store.select(fromStore.getBookmarksSubpage);

  constructor(private store: Store<CoreState>,
    private router: Router) { }

  ngOnInit() {
    this.store.dispatch(new bookmarkActions.Fetch);
  }


  navigateToSubpage(title) {
    this.router.navigate(['/subpage', title]);

  }

  navigateToFav() {
    this.router.navigate(['/main/favourites']);
  }
}
