import { EnumUserRoles } from '../../../constants/enumUserRoles';

export interface UserDto {
  id: string;
  enabled: boolean;
  firstName: string;
  lastName: string;
  middleName: string;
  email: string;
  login: string;
  phone: string;
  isConfirmed: boolean;
  isEmailSent: boolean;
  createdOn: string;
  userRole: EnumUserRoles;
  fullName: string;
}

export interface ChangeUserRole {
  id: string;
  userRole: EnumUserRoles;
}

export interface UserRegistrationDto {
  firstName: string;
  lastName: string;
  middleName: string;
  phone: string;
  password: string;
  confirmPassword: string;
  email: string;
}

export interface UserRoleDto {
  name: string;
  code: number;
  id: number;
}
