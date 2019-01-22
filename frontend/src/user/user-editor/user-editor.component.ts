import { Component, OnInit, OnDestroy} from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatcher } from 'src/shared/reusable-functions/passwordMatcher';
import { UserEditorCredentialsModel, UserEditorPictureModel,
  UserEditorPasswordModel, UserInfoModel } from '../../app/models/user-editor.model';
import { UserService } from '../services/user.service';
import { HttpErrorResponse } from '@angular/common/http';
import { UserModel } from '../models/user.model';
import { Observable, Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import { State } from '../store/user.states';
import { CurrentUser } from '../store/user.reducers';
import * as Actions from '../store/user.actions';

@Component({
  selector: 'app-user-editor',
  templateUrl: './user-editor.component.html',
  styleUrls: ['./user-editor.component.scss']
})
export class UserEditorComponent implements OnInit, OnDestroy {
  currentUser$: Observable<UserModel>;
  currentUser: UserModel;
  usersub: Subscription;

  changePasswordForm: FormGroup;
  changeCredentialsForm: FormGroup;
  changePicForm: FormGroup;
  error: HttpErrorResponse;
  pictureUrl;
  user: UserInfoModel = {
    firstName: 'Lufa',
    lastName: 'Lufowski',
    pic: '',
  };

  constructor(
    private modalService: ModalService,
    private changePasswordFormBuilder: FormBuilder,
    private changeCredentialsFormBuilder: FormBuilder,
    private changePicFormBuilder: FormBuilder,
    private userService: UserService,
    private store: Store<State>
  ) { }

  private validationMessages = {
    required: 'The field is required',
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
    firstName: 'First name must be longer than 1 character',
    lastName: 'Last name must be longer than 1 character',
  };

  ngOnInit() {
    this.store.dispatch(new Actions.Fetch);
    this.currentUser$ = this.store.select(CurrentUser);
    this.usersub = this.currentUser$.subscribe(user => this.currentUser = user);


    this.changePasswordForm = this.changePasswordFormBuilder.group({
      oldPassword: ['', [Validators.required, Validators.minLength(5)]],
      passwordGroup: this.changePasswordFormBuilder.group({
        password: ['', [Validators.required, Validators.minLength(5)]],
        repeatPassword: ['', Validators.required]
      }, {validator: passwordMatcher}),
    });

    this.changeCredentialsForm = this.changeCredentialsFormBuilder.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
    });

    this.changePicForm = this.changePicFormBuilder.group({
      picture: '',
    });
  }

  openModal(id: string) {
    this.modalService.open(id);
  }

  closeModal(id: string) {
    this.modalService.close(id);
  }

  changeCredentials(changeCredentialsForm) {
    this.userService.changeCredentials(changeCredentialsForm).subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
      this.error = err;
    }
    );
  }
  changePassword(changePasswordForm) {
    this.userService.changePassword(changePasswordForm.value).subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
      this.error = err;
    }
    );
  }

  changePic() {
    this.userService.changePic(this.pictureUrl).subscribe(data => {
      console.log(data);
    },
    err => {
      console.log(err);
      this.error = err;
    }
    );
  }

  pictureUpload(event) {
    this.pictureUrl = event.target.files[0];
    const reader = new FileReader;
    reader.onload = () => {
      this.pictureUrl = reader.result;
    };
    reader.readAsDataURL(this.pictureUrl);
  }

  ngOnDestroy(): void {
    this.usersub.unsubscribe();
  }

}
