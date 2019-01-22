import { RoleEnum } from './role.enum';
import { RegisteredEnum } from './registered.enum';

export interface TokenModel {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  isBanned: boolean;
  role: RoleEnum;
  registered: RegisteredEnum;
}
