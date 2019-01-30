import { CommandCMDModel } from './command-cmd.model';

export interface LoginLogoutCMDModel extends CommandCMDModel {
  payload: {
    user: {
      id: string;
      firstName: string;
      lastName: string;
    }
  };
}
