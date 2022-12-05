import {FocusableOption, FocusMonitor, FocusOrigin} from '@angular/cdk/a11y';
import {BooleanInput} from '@angular/cdk/coercion';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  ViewEncapsulation,
  Inject,
  Optional,
  Input,
  HostListener,
  AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {
  CanDisable,
  CanDisableRipple,
  mixinDisabled,
  mixinDisableRipple
} from '@angular/material/core';
import {Subject} from 'rxjs';
import {DOCUMENT} from '@angular/common';
import {UI_POPOVER_PANEL, UiPopoverPanel} from './popover-panel';

// Boilerplate for applying mixins to UiPopoverItem.
/** @docs-private */
const _UiPopoverItemBase = mixinDisableRipple(mixinDisabled(class {}));

/**
 * Single item inside of a `uiux-popover`. Provides the popover item styling and accessibility treatment.
 */
@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: '[uiux-popover-item]',
  exportAs: 'uiuxPopoverItem',
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['disabled', 'disableRipple'],
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.role]': 'role',
    '[class.uiux-popover-item]': 'true',
    '[class.uiux-popover-item-highlighted]': '_highlighted',
    '[class.uiux-popover-item-subpopover-trigger]': '_triggersSubpopover',
    '[attr.tabindex]': '_getTabIndex()',
    '[attr.aria-disabled]': 'disabled.toString()',
    '[attr.disabled]': 'disabled || null',
    class: 'mat-focus-indicator'
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  templateUrl: 'popover-item.html'
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UiPopoverItem
  extends _UiPopoverItemBase
  implements
    FocusableOption,
    CanDisable,
    CanDisableRipple,
    AfterViewInit,
    OnDestroy
{
  /** ARIA role for the popover item. */
  @Input() role: 'popoveritem' | 'popoveritemradio' | 'popoveritemcheckbox' =
    'popoveritem';

  /** Stream that emits when the popover item is hovered. */
  readonly _hovered: Subject<UiPopoverItem> = new Subject<UiPopoverItem>();

  /** Stream that emits when the popover item is focused. */
  readonly _focused = new Subject<UiPopoverItem>();

  /** Whether the popover item is highlighted. */
  _highlighted = false;

  /** Whether the popover item acts as a trigger for a sub-popover. */
  _triggersSubpopover = false;

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    /**
     * @deprecated `_document` parameter is no longer being used and will be removed.
     * @breaking-change 12.0.0
     */
    @Inject(DOCUMENT) _document?: any,
    private _focusMonitor?: FocusMonitor,
    @Inject(UI_POPOVER_PANEL)
    @Optional()
    public _parentMenu?: UiPopoverPanel<UiPopoverItem>,
    /**
     * @deprecated `_changeDetectorRef` to become a required parameter.
     * @breaking-change 14.0.0
     */
    private _changeDetectorRef?: ChangeDetectorRef
  ) {
    // @breaking-change 8.0.0 make `_focusMonitor` and `document` required params.
    super();

    if (_parentMenu && _parentMenu.addItem) {
      _parentMenu.addItem(this);
    }
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
  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
  // tslint:disable-next-line:no-host-decorator-in-concrete
  @HostListener('click', ['$event'])
  _checkDisabled(event: Event): void {
    if (this.disabled) {
      event.preventDefault();
      event.stopPropagation();
    }
  }

  /** Emits to the hover stream. */
  // We have to use a `HostListener` here in order to support both Ivy and ViewEngine.
  // In Ivy the `host` bindings will be merged when this class is extended, whereas in
  // ViewEngine they're overwritten.
  // TODO(crisbeto): we move this back into `host` once Ivy is turned on by default.
  // tslint:disable-next-line:no-host-decorator-in-concrete
  @HostListener('mouseenter')
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
    // `uiPopoverContent` whose change detection tree is at the declaration position,
    // not the insertion position. See #23175.
    // @breaking-change 14.0.0 Remove null check for `_changeDetectorRef`.
    this._highlighted = isHighlighted;
    this._changeDetectorRef?.markForCheck();
  }

  // eslint-disable-next-line @typescript-eslint/member-ordering
  static ngAcceptInputType_disabled: BooleanInput;
  // eslint-disable-next-line @typescript-eslint/member-ordering
  static ngAcceptInputType_disableRipple: BooleanInput;
}
