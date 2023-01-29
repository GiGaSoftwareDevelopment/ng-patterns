



export interface UserIdWithRole {
  role: number;
  uid: string;
}

export interface UserPermissions {
  // Permissions
  createdBy: UserIdWithRole;
  createdByUID: string;
  members: {[uid: string]: UserIdWithRole};
  memberUIDs: string[];
}
