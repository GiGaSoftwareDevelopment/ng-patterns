/**
 * Throws an exception for the case when popover's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export function throwNgPatPopoverInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: <ng-pat-popover xPosition="before" #popover="ng-patPopover"></ng-pat-popover>`);
}

/**
 * Throws an exception for the case when popover's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwNgPatPopoverInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: <ng-pat-popover yPosition="above" #popover="ng-patPopover"></ng-pat-popover>`);
}

/**
 * Throws an exception for the case when a popover is assigned
 * to a trigger that is placed inside the same popover.
 * @docs-private
 */
export function throwNgPatPopoverRecursiveError() {
  throw Error(
    `ng-patPopoverTriggerFor: popover cannot contain its own trigger. Assign a popover that is ` +
      `not a parent of the trigger or move the trigger outside of the popover.`
  );
}
