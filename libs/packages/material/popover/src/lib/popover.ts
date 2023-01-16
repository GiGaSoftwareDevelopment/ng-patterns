

import {
  AfterContentInit,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ContentChildren,
  Directive,
  ElementRef,
  EventEmitter,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Output,
  TemplateRef,
  QueryList,
  ViewChild,
  ViewEncapsulation,
  OnInit,
  ChangeDetectorRef,
} from '@angular/core';
import {AnimationEvent} from '@angular/animations';
import {FocusKeyManager, FocusOrigin} from '@angular/cdk/a11y';
import {Direction} from '@angular/cdk/bidi';
import {BooleanInput, coerceBooleanProperty} from '@angular/cdk/coercion';
import {
  ESCAPE,
  LEFT_ARROW,
  RIGHT_ARROW,
  DOWN_ARROW,
  UP_ARROW,
  hasModifierKey,
} from '@angular/cdk/keycodes';
import {merge, Observable, Subject, Subscription} from 'rxjs';
import {startWith, switchMap, take} from 'rxjs/operators';
import {UiuxPopoverItem} from './popover-item';
import {UiuxPopoverPanel, UIUX_POPOVER_PANEL} from './popover-panel';
import {MenuPositionX, MenuPositionY} from './popover-positions';
import {throwUiuxPopoverInvalidPositionX, throwUiuxPopoverInvalidPositionY} from './popover-errors';
import {UiuxPopoverContent, UIUX_POPOVER_CONTENT} from './popover-content';
import {uiuxPopoverAnimations} from './popover-animations';

let popoverPanelUid = 0;

/** Reason why the popover was closed. */
export type MenuCloseReason = void | 'click' | 'keydown' | 'tab';

/** Default `uiux-popover` options that can be overridden. */
export interface UiuxPopoverDefaultOptions {
  /** The x-axis position of the popover. */
  xPosition: MenuPositionX;

  /** The y-axis position of the popover. */
  yPosition: MenuPositionY;

  /** Whether the popover should overlap the popover trigger. */
  overlapTrigger: boolean;

  /** Class to be applied to the popover's backdrop. */
  backdropClass: string;

  /** Class or list of classes to be applied to the popover's overlay panel. */
  overlayPanelClass?: string | string[];

  /** Whether the popover has a backdrop. */
  hasBackdrop?: boolean;
}

/** Injection token to be used to override the default options for `uiux-popover`. */
export const UIUX_POPOVER_DEFAULT_OPTIONS = new InjectionToken<UiuxPopoverDefaultOptions>(
  'uiux-popover-default-options',
  {
    providedIn: 'root',
    factory: UIUX_POPOVER_DEFAULT_OPTIONS_FACTORY,
  },
);

/** @docs-private */
export function UIUX_POPOVER_DEFAULT_OPTIONS_FACTORY(): UiuxPopoverDefaultOptions {
  return {
    overlapTrigger: false,
    xPosition: 'after',
    yPosition: 'below',
    backdropClass: 'cdk-overlay-transparent-backdrop',
  };
}

/** Base class with all of the `UiuxPopover` functionality. */
@Directive()
export class _UiuxPopoverBase
  implements AfterContentInit, UiuxPopoverPanel<UiuxPopoverItem>, OnInit, OnDestroy
{
  private _keyManager!: FocusKeyManager<UiuxPopoverItem>;
  private _xPosition: MenuPositionX = this._defaultOptions.xPosition;
  private _yPosition: MenuPositionY = this._defaultOptions.yPosition;
  private _firstItemFocusSubscription?: Subscription;
  private _previousElevation!: string;
  protected _elevationPrefix!: string;
  protected _baseElevation!: number;

  /** All items inside the popover. Includes items nested inside another popover. */
  @ContentChildren(UiuxPopoverItem, {descendants: true}) _allItems!: QueryList<UiuxPopoverItem>;

  /** Only the direct descendant popover items. */
  _directDescendantItems = new QueryList<UiuxPopoverItem>();

  /** Config object to be passed into the popover's ngClass */
  _classList: {[key: string]: boolean} = {};

  /** Current state of the panel animation. */
  _panelAnimationState: 'void' | 'enter' = 'void';

  /** Emits whenever an animation on the popover completes. */
  readonly _animationDone = new Subject<AnimationEvent>();

  /** Whether the popover is animating. */
  _isAnimating!: boolean;

  /** Parent popover of the current popover panel. */
  parentMenu: UiuxPopoverPanel | undefined;

  /** Layout direction of the popover. */
  direction!: Direction;

  /** Class or list of classes to be added to the overlay panel. */
  overlayPanelClass: string | string[] = this._defaultOptions.overlayPanelClass || '';

  /** Class to be added to the backdrop element. */
  @Input() backdropClass: string = this._defaultOptions.backdropClass;

  /** aria-label for the popover panel. */
  @Input('aria-label') ariaLabel!: string;

  /** aria-labelledby for the popover panel. */
  @Input('aria-labelledby') ariaLabelledby!: string;

  /** aria-describedby for the popover panel. */
  @Input('aria-describedby') ariaDescribedby!: string;

  /** Position of the popover in the X axis. */
  @Input()
  get xPosition(): MenuPositionX {
    return this._xPosition;
  }
  set xPosition(value: MenuPositionX) {
    if (
      value !== 'before' &&
      value !== 'after' 
    ) {
      throwUiuxPopoverInvalidPositionX();
    }
    this._xPosition = value;
    this.setPositionClasses();
  }

  /** Position of the popover in the Y axis. */
  @Input()
  get yPosition(): MenuPositionY {
    return this._yPosition;
  }
  set yPosition(value: MenuPositionY) {
    if (value !== 'above' && value !== 'below' ) {
      throwUiuxPopoverInvalidPositionY();
    }
    this._yPosition = value;
    this.setPositionClasses();
  }

  /** @docs-private */
  @ViewChild(TemplateRef) templateRef!: TemplateRef<any>;

  /**
   * List of the items inside of a popover.
   * @deprecated
   * @breaking-change 8.0.0
   */
  @ContentChildren(UiuxPopoverItem, {descendants: false}) items!: QueryList<UiuxPopoverItem>;

  /**
   * Menu content that will be rendered lazily.
   * @docs-private
   */
  @ContentChild(UIUX_POPOVER_CONTENT) lazyContent!: UiuxPopoverContent;

  /** Whether the popover should overlap its trigger. */
  @Input()
  get overlapTrigger(): boolean {
    return this._overlapTrigger;
  }
  set overlapTrigger(value: BooleanInput) {
    this._overlapTrigger = coerceBooleanProperty(value);
  }
  private _overlapTrigger: boolean = this._defaultOptions.overlapTrigger;

  /** Whether the popover has a backdrop. */
  @Input()
  get hasBackdrop(): boolean | undefined {
    return this._hasBackdrop;
  }
  set hasBackdrop(value: BooleanInput) {
    this._hasBackdrop = coerceBooleanProperty(value);
  }
  private _hasBackdrop: boolean | undefined = this._defaultOptions.hasBackdrop;

  /**
   * This method takes classes set on the host uiux-popover element and applies them on the
   * popover template that displays in the overlay container.  Otherwise, it's difficult
   * to style the containing popover from outside the component.
   * @param classes list of class names
   */
  @Input('class') // eslint-disable-line
  set panelClass(classes: string) {
    const previousPanelClass = this._previousPanelClass;

    if (previousPanelClass && previousPanelClass.length) {
      previousPanelClass.split(' ').forEach((className: string) => {
        this._classList[className] = false;
      });
    }

    this._previousPanelClass = classes;

    if (classes && classes.length) {
      classes.split(' ').forEach((className: string) => {
        this._classList[className] = true;
      });

      this._elementRef.nativeElement.className = '';
    }
  }
  private _previousPanelClass!: string;

  /**
   * This method takes classes set on the host uiux-popover element and applies them on the
   * popover template that displays in the overlay container.  Otherwise, it's difficult
   * to style the containing popover from outside the component.
   * @deprecated Use `panelClass` instead.
   * @breaking-change 8.0.0
   */
  @Input()
  get classList(): string {
    return this.panelClass;
  }
  set classList(classes: string) {
    this.panelClass = classes;
  }

  /** Event emitted when the popover is closed. */
  @Output() readonly closed: EventEmitter<MenuCloseReason> = new EventEmitter<MenuCloseReason>();

  /**
   * Event emitted when the popover is closed.
   * @deprecated Switch to `closed` instead
   * @breaking-change 8.0.0
   */
  // eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly close: EventEmitter<MenuCloseReason> = this.closed;

  readonly panelId = `uiux-popover-panel-${popoverPanelUid++}`;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    defaultOptions: UiuxPopoverDefaultOptions,
    changeDetectorRef: ChangeDetectorRef,
  );

  /**
   * @deprecated `_changeDetectorRef` to become a required parameter.
   * @breaking-change 15.0.0
   */
  constructor(
    elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    defaultOptions: UiuxPopoverDefaultOptions,
    changeDetectorRef?: ChangeDetectorRef,
  );

  constructor(
    private _elementRef: ElementRef<HTMLElement>,
    private _ngZone: NgZone,
    @Inject(UIUX_POPOVER_DEFAULT_OPTIONS) private _defaultOptions: UiuxPopoverDefaultOptions,
    // @breaking-change 15.0.0 `_changeDetectorRef` to become a required parameter.
    private _changeDetectorRef?: ChangeDetectorRef,
  ) {}

  ngOnInit() {
    this.setPositionClasses();
  }

  ngAfterContentInit() {
    this._updateDirectDescendants();
    this._keyManager = new FocusKeyManager(this._directDescendantItems)
      .withWrap()
      .withTypeAhead()
      .withHomeAndEnd();
    this._keyManager.tabOut.subscribe(() => this.closed.emit('tab'));

    // If a user manually (programmatically) focuses a popover item, we need to reflect that focus
    // change back to the key manager. Note that we don't need to unsubscribe here because _focused
    // is internal and we know that it gets completed on destroy.
    this._directDescendantItems.changes
      .pipe(
        startWith(this._directDescendantItems),
        switchMap(items => merge(...items.map((item: UiuxPopoverItem) => item._focused))),
      )
      .subscribe(focusedItem => this._keyManager.updateActiveItem(focusedItem as UiuxPopoverItem));

    this._directDescendantItems.changes.subscribe((itemsList: QueryList<UiuxPopoverItem>) => {
      // Move focus to another item, if the active item is removed from the list.
      // We need to debounce the callback, because multiple items might be removed
      // in quick succession.
      const manager = this._keyManager;

      if (this._panelAnimationState === 'enter' && manager.activeItem?._hasFocus()) {
        const items = itemsList.toArray();
        const index = Math.max(0, Math.min(items.length - 1, manager.activeItemIndex || 0));

        if (items[index] && !items[index].disabled) {
          manager.setActiveItem(index);
        } else {
          manager.setNextItemActive();
        }
      }
    });
  }

  ngOnDestroy() {
    this._keyManager?.destroy();
    this._directDescendantItems.destroy();
    this.closed.complete();
    this._firstItemFocusSubscription?.unsubscribe();
  }

  /** Stream that emits whenever the hovered popover item changes. */
  _hovered(): Observable<UiuxPopoverItem> {
    // Coerce the `changes` property because Angular types it as `Observable<any>`
    const itemChanges = this._directDescendantItems.changes as Observable<QueryList<UiuxPopoverItem>>;
    return itemChanges.pipe(
      startWith(this._directDescendantItems),
      switchMap(items => merge(...items.map((item: UiuxPopoverItem) => item._hovered))),
    ) as Observable<UiuxPopoverItem>;
  }

  /*
   * Registers a popover item with the popover.
   * @docs-private
   * @deprecated No longer being used. To be removed.
   * @breaking-change 9.0.0
   */
  addItem(_item: UiuxPopoverItem) {} // eslint-disable-line

  /**
   * Removes an item from the popover.
   * @docs-private
   * @deprecated No longer being used. To be removed.
   * @breaking-change 9.0.0
   */
  removeItem(_item: UiuxPopoverItem) {} // eslint-disable-line

  /** Handle a keyboard event from the popover, delegating to the appropriate action. */
  _handleKeydown(event: KeyboardEvent) {
    const keyCode = event.keyCode;
    const manager = this._keyManager;

    switch (keyCode) {
      case ESCAPE:
        if (!hasModifierKey(event)) {
          event.preventDefault();
          this.closed.emit('keydown');
        }
        break;
      case LEFT_ARROW:
        if (this.parentMenu && this.direction === 'ltr') {
          this.closed.emit('keydown');
        }
        break;
      case RIGHT_ARROW:
        if (this.parentMenu && this.direction === 'rtl') {
          this.closed.emit('keydown');
        }
        break;
      default:
        if (keyCode === UP_ARROW || keyCode === DOWN_ARROW) {
          manager.setFocusOrigin('keyboard');
        }

        manager.onKeydown(event);
        return;
    }

    // Don't allow the event to propagate if we've already handled it, or it may
    // end up reaching other overlays that were opened earlier (see #22694).
    event.stopPropagation();
  }

  /**
   * Focus the first item in the popover.
   * @param origin Action from which the focus originated. Used to set the correct styling.
   */
  focusFirstItem(origin: FocusOrigin = 'program'): void {
    // Wait for `onStable` to ensure iOS VoiceOver screen reader focuses the first item (#24735).
    this._firstItemFocusSubscription?.unsubscribe();
    this._firstItemFocusSubscription = this._ngZone.onStable.pipe(take(1)).subscribe(() => {
      let popoverPanel: HTMLElement | null = null;

      if (this._directDescendantItems.length) {
        // Because the `uiux-popoverPanel` is at the DOM insertion point, not inside the overlay, we don't
        // have a nice way of getting a hold of the popoverPanel panel. We can't use a `ViewChild` either
        // because the panel is inside an `ng-template`. We work around it by starting from one of
        // the items and walking up the DOM.
        popoverPanel = this._directDescendantItems.first!._getHostElement().closest('[role="popover"]'); // eslint-disable-line
      }

      // If an item in the popoverPanel is already focused, avoid overriding the focus.
      if (!popoverPanel || !popoverPanel.contains(document.activeElement)) {
        const manager = this._keyManager;
        manager.setFocusOrigin(origin).setFirstItemActive();

        // If there's no active item at this point, it means that all the items are disabled.
        // Move focus to the popoverPanel panel so keyboard events like Escape still work. Also this will
        // give _some_ feedback to screen readers.
        if (!manager.activeItem && popoverPanel) {
          popoverPanel.focus();
        }
      }
    });
  }

  /**
   * Resets the active item in the popover. This is used when the popover is opened, allowing
   * the user to start from the first option when pressing the down arrow.
   */
  resetActiveItem() {
    this._keyManager.setActiveItem(-1);
  }

  /**
   * Sets the popover panel elevation.
   * @param depth Number of parent popovers that come before the popover.
   */
  setElevation(depth: number): void {
    // The elevation starts at the base and increases by one for each level.
    // Capped at 24 because that's the maximum elevation defined in the Material design spec.
    const elevation = Math.min(this._baseElevation + depth, 24);
    const newElevation = `${this._elevationPrefix}${elevation}`;
    const customElevation = Object.keys(this._classList).find(className => {
      return className.startsWith(this._elevationPrefix);
    });

    if (!customElevation || customElevation === this._previousElevation) {
      if (this._previousElevation) {
        this._classList[this._previousElevation] = false;
      }

      this._classList[newElevation] = true;
      this._previousElevation = newElevation;
    }
  }

  /**
   * Adds classes to the popover panel based on its position. Can be used by
   * consumers to add specific styling based on the position.
   * @param posX Position of the popover along the x axis.
   * @param posY Position of the popover along the y axis.
   * @docs-private
   */
  setPositionClasses(posX: MenuPositionX = this.xPosition, posY: MenuPositionY = this.yPosition) {
    const classes = this._classList;
    classes['uiux-popover-before'] = posX === 'before';
    classes['uiux-popover-after'] = posX === 'after';
    classes['uiux-popover-above'] = posY === 'above';
    classes['uiux-popover-below'] = posY === 'below';

    // @breaking-change 15.0.0 Remove null check for `_changeDetectorRef`.
    this._changeDetectorRef?.markForCheck();
  }

  /** Starts the enter animation. */
  _startAnimation() {
    // @breaking-change 8.0.0 Combine with _resetAnimation.
    this._panelAnimationState = 'enter';
  }

  /** Resets the panel animation to its initial state. */
  _resetAnimation() {
    // @breaking-change 8.0.0 Combine with _startAnimation.
    this._panelAnimationState = 'void';
  }

  /** Callback that is invoked when the panel animation completes. */
  _onAnimationDone(event: AnimationEvent) {
    this._animationDone.next(event);
    this._isAnimating = false;
  }

  _onAnimationStart(event: AnimationEvent) {
    this._isAnimating = true;

    // Scroll the content element to the top as soon as the animation starts. This is necessary,
    // because we move focus to the first item while it's still being animated, which can throw
    // the browser off when it determines the scroll position. Alternatively we can move focus
    // when the animation is done, however moving focus asynchronously will interrupt screen
    // readers which are in the process of reading out the popover already. We take the `element`
    // from the `event` since we can't use a `ViewChild` to access the pane.
    if (event.toState === 'enter' && this._keyManager.activeItemIndex === 0) {
      event.element.scrollTop = 0;
    }
  }

  /**
   * Sets up a stream that will keep track of any newly-added popover items and will update the list
   * of direct descendants. We collect the descendants this way, because `_allItems` can include
   * items that are part of child popovers, and using a custom way of registering items is unreliable
   * when it comes to maintaining the item order.
   */
  private _updateDirectDescendants() {
    this._allItems.changes
      .pipe(startWith(this._allItems))
      .subscribe((items: QueryList<UiuxPopoverItem>) => {
        this._directDescendantItems.reset(items.filter(item => item._parentMenu === this));
        this._directDescendantItems.notifyOnChanges();
      });
  }
}

@Component({
  selector: 'uiux-popover',
  templateUrl: 'popover.html',
  styleUrls: ['popover.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  exportAs: 'uiuxPopover',
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-label]': 'null',
    '[attr.aria-labelledby]': 'null',
    '[attr.aria-describedby]': 'null',
  },
  animations: [uiuxPopoverAnimations.transformMenu, uiuxPopoverAnimations.fadeInItems],
  providers: [{provide: UIUX_POPOVER_PANEL, useExisting: UiuxPopover}],
})
// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UiuxPopover extends _UiuxPopoverBase {
  protected override _elevationPrefix = 'mat-elevation-z';
  protected override _baseElevation = 8;

  /*
   * @deprecated `changeDetectorRef` parameter will become a required parameter.
   * @breaking-change 15.0.0
   */
  constructor(
    elementRef: ElementRef<HTMLElement>,
    ngZone: NgZone,
    defaultOptions: UiuxPopoverDefaultOptions,
  );

  constructor(
    _elementRef: ElementRef<HTMLElement>,
    _ngZone: NgZone,
    @Inject(UIUX_POPOVER_DEFAULT_OPTIONS) _defaultOptions: UiuxPopoverDefaultOptions,
    changeDetectorRef?: ChangeDetectorRef,
  ) {
    super(_elementRef, _ngZone, _defaultOptions, changeDetectorRef);
  }
}
