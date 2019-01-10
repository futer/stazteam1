import { Component, OnInit } from '@angular/core';
import { ModalService } from '../../shared/modal/modal.service';
import { FormGroup, Validators, FormBuilder } from '@angular/forms';
import { passwordMatcher } from 'src/shared/reusable-functions/passwordMatcher';


@Component({
  selector: 'app-example1',
  templateUrl: './example1.component.html',
  styleUrls: ['./example1.component.scss']
})
export class Example1Component implements OnInit {
  changePasswordForm: FormGroup;
  changeCredentialsForm: FormGroup;
  changePicForm: FormGroup;
  pictureUrl;

  constructor(
    private modalService: ModalService,
    private changePasswordFormBuilder: FormBuilder,
    private changeCredentialsFormBuilder: FormBuilder,
    private changePicFormBuilder: FormBuilder,
    ) { }

  private validationMessages = {
    required: 'The field is required',
    password: 'Password must be longer than 5 characters',
    matchingPassword: 'Password doesnt match',
    firstName: 'First name must be longer than 1 character',
    lastName: 'Last name must be longer than 1 character',
  };

  ngOnInit() {
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

  changePassword(changePasswordForm) {
    console.log(changePasswordForm.value);
  }

  pictureUpload(event) {
    this.pictureUrl = event.target.files[0];
    console.log(this.pictureUrl);
    const reader = new FileReader;
    reader.onload = () => {
      this.pictureUrl = reader.result;
    };
    reader.readAsDataURL(this.pictureUrl);
  }

}
