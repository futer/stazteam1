import { prop, Typegoose } from 'typegoose';

enum PositionType {
  TOP,
  RIGHT
}

export class BookmarkModel extends Typegoose {
  @prop()
  title?: string;

  @prop({ enum: PositionType })
  position?: PositionType;

  @prop()
  link?: string;
}
