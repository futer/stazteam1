import { prop, Typegoose } from 'typegoose';

enum RegisteredType {
  LOCAL,
  FACEBOOK,
  GOOGLE,
  LOCAL_FACEBOOK,
  LOCAL_GOOGLE
}

export class UserModel extends Typegoose {
  @prop()
  firstName?: string;

  @prop()
  lastName?: string;

  @prop()
  email?: string;

  @prop()
  password?: string;

  @prop()
  pic?: string;

  @prop({ enum: RegisteredType })
  registered?: RegisteredType;

  @prop({ default: false })
  isBanned?: boolean;
}
