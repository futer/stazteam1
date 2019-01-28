import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { SubpageService } from 'src/shared/services/subpage.service';

@Component({
  selector: 'app-bookmark-form',
  templateUrl: './bookmark-form.component.html',
  styleUrls: ['./bookmark-form.component.scss']
})
export class BookmarkFormComponent implements OnInit {
  @Input() data;
  bookmarkEditForm: FormGroup;
  positions =  {'right': 'RIGHT',  'top': 'TOP'};



  constructor( private editFormBuilder: FormBuilder,
    private subpageService: SubpageService ) { }

  ngOnInit() {
    this.bookmarkEditForm = this.editFormBuilder.group({
      title: [this.data.title],
      position: [this.data.position, Validators.required],
      content: [this.data.content],
      id: [this.data.id]
    });
  }

  updateBookmark(event) {
    if ( window.confirm('Are sure you want to save changes ?')) {
      this.subpageService.update(event.value);
     }
  }

}
