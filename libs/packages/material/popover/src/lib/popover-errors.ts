

/**
 * Throws an exception for the case when popover's x-position value isn't valid.
 * In other words, it doesn't match 'before' or 'after'.
 * @docs-private
 */
export function throwUiuxPopoverInvalidPositionX() {
  throw Error(`xPosition value must be either 'before' or after'.
      Example: <uiux-popover xPosition="before" #popover="uiuxPopover"></uiux-popover>`);
}

/**
 * Throws an exception for the case when popover's y-position value isn't valid.
 * In other words, it doesn't match 'above' or 'below'.
 * @docs-private
 */
export function throwUiuxPopoverInvalidPositionY() {
  throw Error(`yPosition value must be either 'above' or below'.
      Example: <uiux-popover yPosition="above" #popover="uiuxPopover"></uiux-popover>`);
}

/**
 * Throws an exception for the case when a popover is assigned
 * to a trigger that is placed inside the same popover.
 * @docs-private
 */
export function throwUiuxPopoverRecursiveError() {
  throw Error(
    `uiuxPopoverTriggerFor: popover cannot contain its own trigger. Assign a popover that is ` +
      `not a parent of the trigger or move the trigger outside of the popover.`,
  );
}
