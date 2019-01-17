import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { UserModel } from '../models/user.model';
import { Store } from '@ngrx/store';
import { State } from '../store/admin.states';
import * as Actions from '../store/admin.actions';

@Component({
  selector: 'app-admin-user-editor',
  templateUrl: './admin-user-editor.component.html',
  styleUrls: ['./admin-user-editor.component.scss']
})
export class AdminUserEditorComponent implements OnInit {
  users$: Observable<UserModel[]>;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    this.store.dispatch(new Actions.Fetch);

    this.users$ = this.store.select((users: State) => users.users);
  }


}
