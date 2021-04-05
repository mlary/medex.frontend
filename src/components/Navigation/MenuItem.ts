import { EnumUserRoles } from '../../constants/enumUserRoles';

export interface IMenuItem {
  Name: string;
  Title: string;
  Path: string;
  Hidden: boolean;
  Icon: React.ReactNode | string;
  SecondaryPath?: string;
  UserRoles: Array<EnumUserRoles>;
  forceDisableAccess?: boolean;
}
