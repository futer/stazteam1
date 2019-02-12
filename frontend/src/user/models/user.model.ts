import { RegisteredEnum } from 'src/app/models/registered.enum';

export interface UserModel {
    id: string;
    firstName: string;
    lastName: string;
    pic: string;
    registered?: RegisteredEnum;
    email?: string;
}

export interface UserFormModel {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    oldPassword: string;
    pic: string;
}
