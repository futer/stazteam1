import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SubpageService } from 'src/shared/services/subpage.service';

@Component({
  selector: 'app-bookmark-info',
  templateUrl: './bookmark-info.component.html',
  styleUrls: ['./bookmark-info.component.scss']
})
export class BookmarkInfoComponent implements OnInit {

  @Input() data;
  isShown = false;
  bookmarkEditForm: FormGroup;

  constructor( private editFormBuilder: FormBuilder,
    private subpageService: SubpageService) { }

  ngOnInit() {
  }

  toggleForm() {
    this.isShown = !this.isShown;
    console.log(this.isShown);
   }

   showValues(event) {
     console.log(event.value);
   }

   deleteBookmark(id) {
    if ( window.confirm('Are sure you want to delete this bookmark ?')) {
      this.subpageService.delete(id);
     }
   }


}
