

import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Inject,
  Optional,
  Input,
  AfterViewInit,
  ChangeDetectorRef,
} from '@angular/core';
import {
  CanDisable,
  CanDisableRipple,
  mixinDisabled,
  mixinDisableRipple,
} from '@angular/material/core';
import {FocusableOption, FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {UiuxPopoverPanel, UIUX_POPOVER_PANEL} from './popover-panel';

// Boilerplate for applying mixins to UiuxPopoverItem.
/** @docs-private */
const _UiuxPopoverItemBase = mixinDisableRipple(mixinDisabled(class {}));

/**
 * Single item inside of a `uiux-popover`. Provides the popover item styling and accessibility treatment.
 */
@Component({
  selector: '[uiux-popover-item]',
  exportAs: 'uiuxPopoverItem',
  inputs: ['disabled', 'disableRipple'],
  host: {
    '[attr.role]': 'role',
    'class': 'uiux-mdc-popover-item mat-mdc-focus-indicator mdc-list-item',
    '[class.uiux-mdc-popover-item-highlighted]': '_highlighted',
    '[class.uiux-mdc-popover-item-subpopover-trigger]': '_triggersSubpopover',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled',
    '[attr.disabled]': 'disabled || null',
    '(click)': '_checkDisabled($event)',
    '(mouseenter)': '_handleMouseEnter()',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'popover-item.html',
})
export class UiuxPopoverItem
  extends _UiuxPopoverItemBase
  implements FocusableOption, CanDisable, CanDisableRipple, AfterViewInit, OnDestroy
{
  /** ARIA role for the popover item. */
  @Input() role: 'popoveritem' | 'popoveritemradio' | 'popoveritemcheckbox' = 'popoveritem';

  /** Stream that emits when the popover item is hovered. */
  readonly _hovered: Subject<UiuxPopoverItem> = new Subject<UiuxPopoverItem>();

  /** Stream that emits when the popover item is focused. */
  readonly _focused = new Subject<UiuxPopoverItem>();

  /** Whether the popover item is highlighted. */
  _highlighted: boolean = false;

  /** Whether the popover item acts as a trigger for a sub-popover. */
  _triggersSubpopover: boolean = false;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    document: any,
    focusMonitor: FocusMonitor,
    parentMenu: UiuxPopoverPanel<UiuxPopoverItem> | undefined,
    changeDetectorRef: ChangeDetectorRef,
  );

  /**
   * @deprecated `document`, `changeDetectorRef` and `focusMonitor` to become required.
   * @breaking-change 12.0.0
   */
  constructor(
    elementRef: ElementRef<HTMLElement>,
    document?: any,
    focusMonitor?: FocusMonitor,
    parentMenu?: UiuxPopoverPanel<UiuxPopoverItem>,
    changeDetectorRef?: ChangeDetectorRef,
  );

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    @Inject(DOCUMENT) private _document?: any,
    private _focusMonitor?: FocusMonitor,
    @Inject(UIUX_POPOVER_PANEL) @Optional() public _parentMenu?: UiuxPopoverPanel<UiuxPopoverItem>,
    private _changeDetectorRef?: ChangeDetectorRef,
  ) {
    super();
    _parentMenu?.addItem?.(this);
  }

  /** Focuses the popover item. */
  focus(origin?: FocusOrigin, options?: FocusOptions): void {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._getHostElement(), origin, options);
    } else {
      this._getHostElement().focus(options);
    }

    this._focused.next(this);
  }

  ngAfterViewInit() {
    if (this._focusMonitor) {
      // Start monitoring the element so it gets the appropriate focused classes. We want
      // to show the focus style for popover items only when the focus was not caused by a
      // mouse or touch interaction.
      this._focusMonitor.monitor(this._elementRef, false);
    }
  }

  ngOnDestroy() {
    if (this._focusMonitor) {
      this._focusMonitor.stopMonitoring(this._elementRef);
    }

    if (this._parentMenu && this._parentMenu.removeItem) {
      this._parentMenu.removeItem(this);
    }

    this._hovered.complete();
    this._focused.complete();
  }

  /** Used to set the `tabindex`. */
  _getTabIndex(): string {
    return this.disabled ? '-1' : '0';
  }

  /** Returns the host DOM element. */
  _getHostElement(): HTMLElement {
    return this._elementRef.nativeElement;
  }

  /** Prevents the default element actions if it is disabled. */
  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** Emits to the hover stream. */
  _handleMouseEnter() {
    this._hovered.next(this);
  }

  /** Gets the label to be used when determining whether the option should be focused. */
  getLabel(): string {
    const clone = this._elementRef.nativeElement.cloneNode(true) as HTMLElement;
    const icons = clone.querySelectorAll('mat-icon, .material-icons');

    // Strip away icons so they don't show up in the text.
    for (let i = 0; i < icons.length; i++) {
      icons[i].remove();
    }

    return clone.textContent?.trim() || '';
  }

  _setHighlighted(isHighlighted: boolean) {
    // We need to mark this for check for the case where the content is coming from a
    // `uiuxPopoverContent` whose change detection tree is at the declaration position,
    // not the insertion position. See #23175.
    // @breaking-change 12.0.0 Remove null check for `_changeDetectorRef`.
    this._highlighted = isHighlighted;
    this._changeDetectorRef?.markForCheck();
  }

  _setTriggersSubpopover(triggersSubpopover: boolean) {
    // @breaking-change 12.0.0 Remove null check for `_changeDetectorRef`.
    this._triggersSubpopover = triggersSubpopover;
    this._changeDetectorRef?.markForCheck();
  }

  _hasFocus(): boolean {
    return this._document && this._document.activeElement === this._getHostElement();
  }
}
