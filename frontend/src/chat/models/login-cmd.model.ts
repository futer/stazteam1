import { CommandCMDModel } from './command-cmd.model';

export interface LoginCMDModel extends CommandCMDModel {
  payload: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
    }
  };
}
