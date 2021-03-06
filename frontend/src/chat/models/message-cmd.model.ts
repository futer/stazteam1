import { CommandCMDModel } from './command-cmd.model';

export interface MessageCMDModel extends CommandCMDModel {
  payload: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
      pic: string;
    };
    message: {
      id: string;
      message: string;
    };
  };
}
