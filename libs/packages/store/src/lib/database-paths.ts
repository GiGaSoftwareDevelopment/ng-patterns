const USERS = 'users';

/**
 * User paths
 */
export function firestoreUserCollection() {
  return `${USERS}`;
}

export function firestoreUserAccountDoc(uid: string): string {
  return `${USERS}/${uid}`;
}

/**
 * Permission paths
 */
export function firestorePermissionsCollection() {
  return `permissions`;
}
