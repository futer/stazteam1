import { Component, OnInit } from '@angular/core';
import { SubpageService } from 'src/shared/services/subpage.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import * as bookmarkActions from '../../../core/store/bookmark/bookmark.actions';
import * as bookmarkStore from '../../../core/store/bookmark/bookmark.reducers';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { BookmarkState } from 'src/core/store/bookmark/bookmark.state';


@Component({
  selector: 'app-subpage-container',
  templateUrl: './subpage-container.component.html',
  styleUrls: ['./subpage-container.component.scss']
})
export class SubpageContainerComponent implements OnInit {

  bookmark$: any = this.store.select(bookmarkStore.getBookmarks);
  title: string;
  subpageData;

  constructor( private store: Store<BookmarkState>,
    private route: ActivatedRoute,
    private router: Router
    ) {
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.getSubpageTitle();
          this.bookmark$.subscribe((res: any) => {
            if (res) {
              res.filter((subpage) => {
                if (subpage.title === this.title) {
                  this.subpageData = subpage;
                }
              });
            }
          });
        }
      });
    }

  ngOnInit() {
    this.store.dispatch(new bookmarkActions.FetchBookmark);
  }

  getSubpageTitle() {
    this.title = this.route.snapshot.paramMap.get('title');
  }
}
