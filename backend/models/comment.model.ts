import { prop, Typegoose } from 'typegoose';

export class CommentModel extends Typegoose {
  @prop({ required: true })
  startComment?: number;

  @prop({ required: true })
  lengthComment?: number;

  @prop({ required: true })
  content?: string;

  @prop({ required: true })
  userId?: string;
}
