import { RoleEnum } from './role.enum';

export interface UserModel {
    data: {
        users: Array<UserWithoutPass>;
    };
}

export interface User {
    id: string;
    firstName: string;
    lastName: string;
    password: string;
    role: RoleEnum;
    pic: string;
}

export interface UserWithoutPass {
    id: string;
    firstName: string;
    lastName: string;
    role: RoleEnum;
    pic: string;
}
