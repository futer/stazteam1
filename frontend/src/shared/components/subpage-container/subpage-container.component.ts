import { Component, OnInit } from '@angular/core';
import { SubpageService } from 'src/shared/services/subpage.service';
import { map } from 'rxjs/operators';
import { Store } from '@ngrx/store';
import { CoreState } from 'src/core/store';
import * as bookmarkActions from '../../../core/store/bookmark/bookmark.actions';
import * as fromStore from '../../../core/store/index';
import { BookmarkModel } from 'src/app/models/bookmark.model';
import { Observable } from 'apollo-link';
import { ActivatedRoute, RouteReuseStrategy, Router, NavigationEnd } from '@angular/router';


@Component({
  selector: 'app-subpage-container',
  templateUrl: './subpage-container.component.html',
  styleUrls: ['./subpage-container.component.scss']
})
export class SubpageContainerComponent implements OnInit {

  bookmark$: any = this.store.select(fromStore.getBookmarksSubpage);
  title: string;
  subpageData;

  constructor( private store: Store<CoreState>,
    private route: ActivatedRoute,
    private router: Router
    ) {
      router.events.subscribe((event) => {
        if (event instanceof NavigationEnd) {
          this.getSubpageTitle();
          // console.log(this.title);
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
