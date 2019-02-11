import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel, User } from '../../app/models/user-editor.model';
import { Store } from '@ngrx/store';
import { State } from '../store/admin.states';
import * as Actions from '../store/admin.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatcher } from 'src/shared/reusable-functions/passwordMatcher';
import { ErrorData } from '../models/error.model';
import { RoleEnum } from 'src/app/models/role.enum';


@Component({
  selector: 'app-admin-user-editor',
  templateUrl: './admin-user-editor.component.html',
  styleUrls: ['./admin-user-editor.component.scss']
})
export class AdminUserEditorComponent implements OnInit, OnDestroy {
  usersub: Subscription;
  users$: Observable<any>;

  users: UserModel;
  error: ErrorData;
  send: boolean;

  usersfiltered: UserModel;
  selectedUser: User;

  updateUserForm: FormGroup;
  pictureUrl;
  searchbox: string;
  roles: string[];

  private validationMessages = {
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
  };

  constructor(
    private store: Store<State>,
    private changeUserFormBuilder: FormBuilder
    ) {
      this.usersfiltered = { data: { users: [] } };
    }

  ngOnInit() {
    this.searchbox = '';
    this.store.dispatch(new Actions.Fetch);

    this.users$ = this.store.select(wholeStore => wholeStore.users);
    this.usersub = this.users$.subscribe((store) => {
      this.users = store.users;
      if (store.users) { this.filter(); this.error = null; this.send = null; }
      if (store.errorMessage) { this.error = store.errorMessage; this.send = null; }
      if (store.sent) { this.send = store.sent; this.error = null; }
    });
    this.roles = ['user', 'editor', 'moderator', 'reviewer', 'admin'];

    this.updateUserForm = this.changeUserFormBuilder.group({
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      picture: '',
      role: '',
      changePasswordGroup: this.changeUserFormBuilder.group({
        password: ['', [Validators.minLength(5)]],
        repeatPassword: ['']
      }, { validator: passwordMatcher }),
    });
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
    this.store.dispatch(new Actions.Destroy);
  }

  updateUser(form) {
    const user: User = {
      id: this.selectedUser.id,
      firstName: form.value.firstName === '' ? undefined : form.value.firstName,
      lastName: form.value.lastName === '' ? undefined : form.value.lastName,
      pic: form.value.pic,
      role: form.value.role,
      password: form.value.changePasswordGroup.password === ''
       ? undefined : form.value.changePasswordGroup.password
    };
    this.store.dispatch(new Actions.Send(user));
  }

  pictureUpload(event) {
    this.pictureUrl = event.target.files[0];
    const reader = new FileReader;
    reader.onload = () => {
      this.pictureUrl = reader.result;
    };
    reader.readAsDataURL(this.pictureUrl);
  }

  filter() {
    this.usersfiltered.data.users = this.users.data.users.filter(user => {
      return (user.firstName.toLocaleLowerCase().includes(this.searchbox) || user.lastName.toLocaleLowerCase().includes(this.searchbox));
    });
  }
}
