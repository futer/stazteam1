import { Component, OnInit, OnDestroy, EventEmitter, ViewChild, ElementRef } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UserModel, User } from '../../app/models/user-editor.model';
import { Store } from '@ngrx/store';
import { State } from '../store/admin.states';
import * as Actions from '../store/admin.actions';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { passwordMatcher } from 'src/shared/reusable-functions/passwordMatcher';
import { ErrorData } from '../models/error.model';
import { DomSanitizer } from '@angular/platform-browser';
import * as pictureUploadFunctions from '../../shared/reusable-functions/pictureUpload';
import { InputComponent } from 'src/shared/forms/input/input.component';

@Component({
  selector: 'app-admin-user-editor',
  templateUrl: './admin-user-editor.component.html',
  styleUrls: ['./admin-user-editor.component.scss']
})

export class AdminUserEditorComponent implements OnInit, OnDestroy {
  @ViewChild('pic', {read: ElementRef}) myInputVariable: ElementRef;
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
  picture;
  files;

  private validationMessages = {
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
  };

  constructor(
    private store: Store<State>,
    private changeUserFormBuilder: FormBuilder,
    private sanitizer: DomSanitizer
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
      pic: '',
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
    this.myInputVariable.nativeElement.childNodes[0].value = '';
  }

  filter() {
    this.usersfiltered.data.users = this.users.data.users.filter(user => {
      return (user.firstName.toLocaleLowerCase().includes(this.searchbox) || user.lastName.toLocaleLowerCase().includes(this.searchbox));
    });
  }

  pictureUpload(event) {
    pictureUploadFunctions.pictureUpload(event).then(pic => {
      if (pic) {
        this.picture = pic;
        this.updateUserForm.get('pic').setValue(pic);
      } else {
        window.alert('This image is too big');
      }
    });
  }

  // getPic() {
  //   return pictureUploadFunctions.getPic(this.picture, this.sanitizer);
  // }

  getPic() {
    if (this.picture) {
      return this.sanitizer.bypassSecurityTrustUrl(`data:image/png;base64, ${this.picture}`);
    }
    return '../../assets/img/avatar.png';
  }

  updatePic() {
    this.picture = this.selectedUser.pic;
  }
}
