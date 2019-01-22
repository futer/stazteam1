import { CommandCMDModel } from './command-cmd.model';
import { BanEnum } from './ban.enum';

export interface BanCMDModel extends CommandCMDModel {
  payload: {
    id: string;
    ban: BanEnum;
  };
}
