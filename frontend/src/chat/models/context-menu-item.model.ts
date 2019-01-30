import { BanEnum } from './ban.enum';

export interface ContextMenuItemModel {
  command: BanEnum;
  value: string;
  classDisabled: string;
}
