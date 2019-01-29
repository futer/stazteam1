import { RoleEnum } from './role.enum';
import { RegisteredEnum } from './registered.enum';

export interface UserModel {
    _id: string;
    firstName: string;
    lastName: string;
    pic: string;
    email: string;
    isBanned: boolean;
    role: RoleEnum;
    registered: RegisteredEnum;
}
