/**
 * @license
 * Copyright NGPAT Engineering All Rights Reserved.
 */

/**
 * Snippet from here:
 * http://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
 *
 */
export function guid(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    // tslint:disable
    const r = (Math.random() * 16) | 0;
    const v = c === 'x' ? r : (r & 0x3) | 0x8;
    // tslint:enable
    return v.toString(16);
  });
}
