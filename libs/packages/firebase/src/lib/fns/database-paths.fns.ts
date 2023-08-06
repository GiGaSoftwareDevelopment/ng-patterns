

export function firestoreUserAccountDoc(uid: string, usersPath = 'users'): string {
  return `${usersPath}/${uid}`;
}

export function firestoreUserCollection(userPath = 'users') {
  return `${userPath}`;
}
