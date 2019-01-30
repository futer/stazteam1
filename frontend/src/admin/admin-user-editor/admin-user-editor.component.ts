import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel, User } from '../../app/models/user-editor.model';
import { Store } from '@ngrx/store';
import { State } from '../store/admin.states';
import * as Actions from '../store/admin.actions';
import { Users, Errors, SendSuccess } from '../store/admin.reducers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatcher, passwordTouchedChecker } from 'src/shared/reusable-functions/passwordMatcher';
import { filter } from 'rxjs/operators';
import { ErrorData } from '../models/error.model';

@Component({
  selector: 'app-admin-user-editor',
  templateUrl: './admin-user-editor.component.html',
  styleUrls: ['./admin-user-editor.component.scss']
})
export class AdminUserEditorComponent implements OnInit, OnDestroy {
  usersub: Subscription;
  errorsub: Subscription;
  sentsub: Subscription;

  users$: Observable<UserModel>;
  error$: Observable<ErrorData>;
  send$: Observable<boolean>;

  users: UserModel;
  error: ErrorData;
  send: boolean;

  usersfiltered: UserModel;
  selectedUser: User;

  updateUserForm: FormGroup;
  pictureUrl;
  searchbox: string;

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

    this.users$ = this.store.select(Users);
    this.error$ = this.store.select(Errors);
    this.send$ = this.store.select(SendSuccess);

    this.usersub = this.users$.subscribe(users => {
      this.users = users;
      if (this.users) { this.filter(); }
    });

    this.errorsub = this.error$.subscribe(error => {
      this.error = error;
    });

    this.sentsub = this.send$.subscribe(sent => {
      this.send = sent;
    });

    this.updateUserForm = this.changeUserFormBuilder.group({
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      picture: '',
      changePasswordGroup: this.changeUserFormBuilder.group({
        oldPassword: ['', [Validators.minLength(5)]],
        passwordGroup: this.changeUserFormBuilder.group({
          password: ['', [Validators.minLength(5)]],
          repeatPassword: ['']
        }, { validator: passwordMatcher }),
      }, { validator: passwordTouchedChecker })
    });
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

  updateUser(form) {
    const user: User = {
      id: this.selectedUser.id,
      firstName: form.value.firstName === '' ? undefined : form.value.firstName,
      lastName: form.value.lastName === '' ? undefined : form.value.lastName,
      pic: form.value.pic,
      password: form.value.changePasswordGroup.passwordGroup.password === '' ? undefined : form.value.firstName
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
