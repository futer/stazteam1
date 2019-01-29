export interface UserEditorCredentialsModel {
    firstName: string;
    lastName: string;
}

export interface UserEditorPictureModel {
    pic: string;
}

export interface UserEditorPasswordModel {
    oldPassword: string;
    passwordGroup: {
        password: string;
        repeatPassword: string;
    };
}

export interface UserInfoModel {
    firstName: string;
    lastName: string;
    pic: string;
}


