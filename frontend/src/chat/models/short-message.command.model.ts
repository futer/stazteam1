import { CommandCMDModel } from 'src/chat/models/command-cmd.model';
import { StatusEnum } from './status.enum';

export interface ShortMessageCMDModel extends CommandCMDModel {
  payload: {
    status: StatusEnum,
    message: string;
  };
}
