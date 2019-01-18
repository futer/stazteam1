import { Component, OnInit, OnDestroy } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel, User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { State } from '../store/admin.states';
import * as Actions from '../store/admin.actions';
import { Users } from '../store/admin.reducers';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatcher, passwordTouchedChecker } from 'src/shared/reusable-functions/passwordMatcher';

@Component({
  selector: 'app-admin-user-editor',
  templateUrl: './admin-user-editor.component.html',
  styleUrls: ['./admin-user-editor.component.scss']
})
export class AdminUserEditorComponent implements OnInit, OnDestroy {
  users$: Observable<UserModel>;
  users: UserModel;
  usersub: Subscription;
  updateUserForm: FormGroup;
  selectedUser: User;
  pictureUrl;
  private validationMessages = {
    required: 'The field is required',
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
    firstName: 'First name must be longer than 1 character',
    lastName: 'Last name must be longer than 1 character',
  };

  constructor(
    private store: Store<State>,
    private changeUserFormBuilder: FormBuilder
    ) { }

  ngOnInit() {
    this.store.dispatch(new Actions.Fetch);
    this.users$ = this.store.select(Users);
    this.usersub = this.users$.subscribe(users => this.users = users);

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

  Change() {
    console.log(this.selectedUser);
  }

  updateUser(form) {
    console.log(form.value);
  }

  pictureUpload(event) {
    this.pictureUrl = event.target.files[0];
    const reader = new FileReader;
    reader.onload = () => {
      this.pictureUrl = reader.result;
    };
    reader.readAsDataURL(this.pictureUrl);
  }
}
