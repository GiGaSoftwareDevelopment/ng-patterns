export interface NgPatRoleMap {
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
  [key: string]: boolean;
}

export enum NG_PAT_ROLES {
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

export interface NgPatUserIdWithRole {
  role: number;
  uid: string;
}

export type NgPatRoleMapCreatorByRole = (role: NG_PAT_ROLES) => NgPatRoleMap;

export type NgPatRoleMapCreator = () => NgPatRoleMap;

export type NgPatUserRoleCreator = (uid: string) => NgPatUserIdWithRole;

export interface NgPatUserPermissions {
  // Permissions
  createdBy: NgPatUserIdWithRole;
  createdByUID: string;
  members: {[uid: string]: NgPatUserIdWithRole};
  memberUIDs: string[];
}
