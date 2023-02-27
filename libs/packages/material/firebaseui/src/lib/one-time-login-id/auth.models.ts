import { InjectionToken } from '@angular/core';

/**
 * One Time Login ID
 * Saved to firestore
 * Copy to apps/firebase/functions/src/models.ts:5
 */
export interface OTLIDFirestore {
  otlid: string;
  jwtToken: string | null;
  uid: string | null;
}

export interface OneTimeLoginIDConfig {
  databasePathAuthCodes: string;
  authSiteURL: string;
}

export const ONE_TIME_LOGIN_ID_CONFIG = new InjectionToken<OneTimeLoginIDConfig>('ONE_TIME_LOGIN_ID_CONFIG');



const ONE_TIME_AUTH_CODES = 'otAuthCodes';

/**
 * @deprecated
 */
export function firestoreOtlidCollection(): string {
  return `${ONE_TIME_AUTH_CODES}`;
}

/**
 * TODO rename function databasePathFirestoreOneTimeID
 * @param databasePathAuthCodes
 * @param otlid
 */
export function firestoreOtlidById(databasePathAuthCodes: string, otlid: string): string {
  return `${databasePathAuthCodes}/${otlid}`;
}
