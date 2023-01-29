export interface RoleMap {
  author: boolean;
  owner: boolean;
  collaborator: boolean;
  readOnly: boolean;
  anonymous: boolean;
  reviewer: boolean;
  teacher: boolean;
  professor: boolean;
  parent: boolean;
  student: boolean;
}

export enum ROLES {
  // Mirror Firebase Roles
  Student = 0,
  Teacher = 1,
  Mentor = 2,

  Collaborator = 8,
  Reviewer = 3,
  ReadOnly = 4,
  Anonymous = 5,
  Professor = 7,

  Owner = 6,
  Author = 9
}

export interface UserIdWithRole {
  role: number;
  uid: string;
}

export type RoleMapCreatorByRole = (role: ROLES) => RoleMap;

export type RoleMapCreator = () => RoleMap;

export type UserRoleCreator = (uid: string) => UserIdWithRole;

export interface UserPermissions {
  // Permissions
  createdBy: UserIdWithRole;
  createdByUID: string;
  members: {[uid: string]: UserIdWithRole};
  memberUIDs: string[];
}
