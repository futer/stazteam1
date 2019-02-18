import {
  Component,
  OnInit,
  OnDestroy
} from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { UserModel, UserFormModel } from '../models/user.model';
import { ErrorData } from '../models/error.model';
import { Store } from '@ngrx/store';
import {
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { passwordMatcher, passwordTouchedChecker } from 'src/shared/reusable-functions/passwordMatcher';
import { UserService } from '../services/user.service';
import { Send } from '../store/user.actions';
import { Errors, SendSuccess } from '../store/user.reducers';
import * as Actions from '../store/user.actions';
import * as AuthActions from '../../core/store/auth/auth.actions';
import { Reload } from '../../core/store/auth/auth.actions';
import { DomSanitizer } from '@angular/platform-browser';
import * as pictureUploadFunctions from '../../shared/reusable-functions/pictureUpload';
import { DisconnectedFlags } from '../models/flags';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, OnDestroy {
  private currentsub: Subscription;
  private errorsub: Subscription;
  private sentsub: Subscription;

  private current: UserModel;
  private error: ErrorData;
  private send: boolean;

  private error$: Observable<ErrorData>;
  private send$: Observable<boolean>;

  private updateUserForm: FormGroup;
  private disconnectForm: FormGroup;

  disconnectFlags: DisconnectedFlags;
  private picture;

  private validationMessages = {
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
  };

  constructor(
    private store: Store<any>,
    private changeUserFormBuilder: FormBuilder,
    private disconnectFromBuilder: FormBuilder,
    private userService: UserService,
    private sanitizer: DomSanitizer
  ) {
    this.current = {
      id: '',
      firstName: '',
      lastName: '',
      pic: ''
    };
    this.disconnectFlags = {
      accountDeleted: false,
      accountIsBeingDeleted: false,
      accountDisconnected: false
    };
  }

  ngOnInit() {
    this.currentsub = this.store.select(wholeStore => wholeStore.auth.user)
      .subscribe(user => {
        if (user) {
          this.current.id = user._id;
          this.current.firstName = user.firstName;
          this.current.lastName = user.lastName;
          this.current.pic = user.pic;
          this.current.registered = user.registered;
          this.current.email = user.email;
          this.picture = this.current.pic;
        }
    });

    this.error$ = this.store.select(Errors);
    this.errorsub = this.error$.subscribe(error => {
      this.error = error;
    });

    this.send$ = this.store.select(SendSuccess);
    this.sentsub = this.send$.subscribe(sent => {
      this.send = sent;
    });

    this.updateUserForm = this.changeUserFormBuilder.group({
      firstName: ['', [Validators.minLength(2)]],
      lastName: ['', [Validators.minLength(2)]],
      pic: '',
      changePasswordGroup: this.changeUserFormBuilder.group({
        oldPassword: ['', [Validators.minLength(5)]],
        passwordGroup: this.changeUserFormBuilder.group({
          password: ['', [Validators.minLength(5)]],
          repeatPassword: ['']
        }, { validator: passwordMatcher }),
      }, { validator: passwordTouchedChecker })
    });

    this.disconnectForm = this.disconnectFromBuilder.group({
      passwordGroup: this.changeUserFormBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5 )]],
        repeatPassword: ['', [Validators.required]]
      }, { validator: passwordMatcher }),
    });
  }

  ngOnDestroy() {
    this.currentsub.unsubscribe();
    this.errorsub.unsubscribe();
    this.sentsub.unsubscribe();
    this.store.dispatch(new Actions.Destroy);
  }

  updateUser(form) {
    const user: UserFormModel = {
      id: this.current.id,
      firstName: form.value.firstName === '' ? undefined : form.value.firstName,
      lastName: form.value.lastName === '' ? undefined : form.value.lastName,
      pic: this.picture,
      password: form.value.changePasswordGroup.passwordGroup.password === ''
        ? undefined : form.value.changePasswordGroup.passwordGroup.password,
      oldPassword: form.value.changePasswordGroup.oldPassword === ''
        ? undefined : form.value.changePasswordGroup.oldPassword
    };
    this.store.dispatch(new Send(user));
  }

  disconnect_keep(form) {
    this.userService.disconnect(this.current.id, form.value.passwordGroup.password)
      .subscribe(data => {
        if (data === true) {
          this.disconnectFlags.keepLocal = false;
          this.disconnectFlags.accountDeleted = true;
          this.store.dispatch(new Reload());
        } else {
          this.disconnectFlags.error = data['name'];
        }
      });
  }

  disconnect_delete() {
    this.disconnectFlags.accountIsBeingDeleted = true;
    this.userService.disconnect_delete(this.current.id)
      .subscribe(data => {
        if (data === true) {
          this.store.dispatch(new AuthActions.Logout());
          this.store.dispatch(new Reload());
        } else {
          this.disconnectFlags.error = data['name'];
        }
      });
  }

  disconnect_local() {
    this.userService.disconnect_local()
      .subscribe(data => {
        if (data === true) {
          this.disconnectFlags.accountDisconnected = true;
          this.store.dispatch(new Reload());
        } else {
          this.disconnectFlags.error = data['name'];
        }
      });
  }

  activateKeep() {
    if (!this.disconnectFlags.keepLocal) {
      this.disconnectFlags.keepLocal = true;
    }
  }

  deactivateKeep() {
    if (this.disconnectFlags.keepLocal) {
      this.disconnectFlags.keepLocal = false;
    }
  }

  pictureUpload(event) {
    pictureUploadFunctions.pictureUpload(event).then(pic => {
      if (pic) {
        this.picture = pic;
      } else {
        window.alert('This image is too big');
      }
    });
  }

  getPic() {
    return pictureUploadFunctions.getPic(this.picture, this.sanitizer);
  }
}
