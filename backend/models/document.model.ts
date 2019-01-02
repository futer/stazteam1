import { prop, Typegoose, Ref, arrayProp } from 'typegoose';

import { CommentModel } from './comment.model';

export class DocumentModel extends Typegoose {
  @prop({ required: true })
  title?: string;

  @prop({ 
      required: true,
      default: Date.now(),    
    })
  date?: Date;

  @prop({ required: true })
  content?: string;

  @arrayProp({ itemsRef: CommentModel })
  comments?: Ref<CommentModel>[];

  @prop({ required: true })
  userId?: string;
}
