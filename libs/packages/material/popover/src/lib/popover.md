`<ng-pat-popover>` is a floating panel containing list of options.

<!-- example(popover-overview) -->

By itself, the `<ng-pat-popover>` element does not render anything. The popover is attached to and opened
via application of the `ngpatPopoverTriggerFor` directive:
<!-- example({"example": "popover-overview",
              "file": "popover-overview-example.html",
              "region": "ng-pat-popover-trigger-for"}) -->

### Toggling the popover programmatically
The popover exposes an API to open/close programmatically. Please note that in this case, an
`ngpatPopoverTriggerFor` directive is still necessary to attach the popover to a trigger element in the DOM.

```ts
class MyComponent {
  @ViewChild(ng-patPopoverTrigger) trigger: ng-patPopoverTrigger;

  someMethod() {
    this.trigger.openMenu();
  }
}
```

### Icons
Menus support displaying `mat-icon` elements before the popover item text.

<!-- example({"example": "popover-icons",
              "file": "popover-icons-example.html"}) -->

### Customizing popover position

By default, the popover will display below (y-axis), after (x-axis), without overlapping
its trigger. The position can be changed using the `xPosition` (`before | after`) and `yPosition`
(`above | below`) attributes. The popover can be forced to overlap the trigger using the
`overlapTrigger` attribute.

<!-- example({"example": "popover-position",
              "file": "popover-position-example.html",
              "region": "popover-position"}) -->

### Nested popover

Material supports the ability for an `ng-pat-popover-item` to open a sub-popover. To do so, you have to define
your root popover and sub-popovers, in addition to setting the `[ngpatPopoverTriggerFor]` on the `ngpat-popover-item`
that should trigger the sub-popover:

<!-- example({"example": "popover-nested",
              "file": "popover-nested-example.html",
              "region": "sub-popover"}) -->

### Lazy rendering
By default, the popover content will be initialized even when the panel is closed. To defer
initialization until the popover is open, the content can be provided as an `ng-template`
with the `ngpatPopoverContent` attribute:

```html
<ng-pat-popover #appMenu="ng-patPopover">
  <ng-template ng-patPopoverContent>
    <button ng-pat-popover-item>Settings</button>
    <button ng-pat-popover-item>Help</button>
  </ng-template>
</ng-pat-popover>

<button mat-icon-button [ng-patPopoverTriggerFor]="appMenu">
  <mat-icon>more_vert</mat-icon>
</button>
```

### Passing in data to a popover
When using lazy rendering, additional context data can be passed to the popover panel via
the `ngpatPopoverTriggerData` input. This allows for a single popover instance to be rendered
with a different set of data, depending on the trigger that opened it:

```html
<ng-pat-popover #appMenu="ng-patPopover">
  <ng-template ng-patPopoverContent let-name="name">
    <button ng-pat-popover-item>Settings</button>
    <button ng-pat-popover-item>Log off {{name}}</button>
  </ng-template>
</ng-pat-popover>

<button mat-icon-button [ng-patPopoverTriggerFor]="appMenu" [ng-patPopoverTriggerData]="{name: 'Sally'}">
  <mat-icon>more_vert</mat-icon>
</button>

<button mat-icon-button [ng-patPopoverTriggerFor]="appMenu" [ng-patPopoverTriggerData]="{name: 'Bob'}">
  <mat-icon>more_vert</mat-icon>
</button>
```

### Keyboard interaction
| Keyboard shortcut      | Action                                      |
|------------------------|---------------------------------------------|
| <kbd>Down Arrow</kbd>  | Focus the next popover item.                   |
| <kbd>Up Arrow</kbd>    | Focus the previous popover item.               |
| <kbd>Left Arrow</kbd>  | Close the current popover if it is a sub-popover. |
| <kbd>Right Arrow</kbd> | Opens the current popover item's sub-popover.     |
| <kbd>Enter</kbd>       | Activate the focused popover item.             |
| <kbd>Escape</kbd>      | Close all open popovers.                       |

### Accessibility

Angular Material's popover component consists of two connected parts: the trigger and the pop-up popover.

The popover trigger is a standard button element augmented with `aria-haspopup`, `aria-expanded`, and
`aria-controls` to create the relationship to the pop-up panel.

The pop-up popover implements the `role="popover"` pattern, handling keyboard interaction and focus
management. Upon opening, the trigger will focus the first focusable popover item. Upon close, the popover
will return focus to its trigger. Avoid creating a popover in which all items are disabled, instead
hiding or disabling the popover trigger. 

Angular Material does not support the `popoveritemcheckbox` or `popoveritemradio` roles.

Always provide an accessible label via `aria-label` or `aria-labelledby` for any popover
triggers or popover items without descriptive text content.
