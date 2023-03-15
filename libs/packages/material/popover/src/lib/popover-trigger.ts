import {
  FocusMonitor,
  FocusOrigin,
  isFakeMousedownFromScreenReader,
  isFakeTouchstartFromScreenReader
} from '@angular/cdk/a11y';
import {Direction, Directionality} from '@angular/cdk/bidi';
import {ENTER, LEFT_ARROW, RIGHT_ARROW, SPACE} from '@angular/cdk/keycodes';
import {
  FlexibleConnectedPositionStrategy,
  HorizontalConnectionPos,
  Overlay,
  OverlayConfig,
  OverlayRef,
  ScrollStrategy,
  VerticalConnectionPos
} from '@angular/cdk/overlay';
import {TemplatePortal} from '@angular/cdk/portal';
import {
  AfterContentInit,
  ChangeDetectorRef,
  Directive,
  ElementRef,
  EventEmitter,
  inject,
  Inject,
  InjectionToken,
  Input,
  NgZone,
  OnDestroy,
  Optional,
  Output,
  Self,
  ViewContainerRef
} from '@angular/core';
import {normalizePassiveListenerOptions} from '@angular/cdk/platform';
import {
  asapScheduler,
  merge,
  Observable,
  of as observableOf,
  Subscription
} from 'rxjs';
import {delay, filter, take, takeUntil} from 'rxjs/operators';
import {_NgPatPopoverBase, MenuCloseReason} from './popover';
import {throwNgPatPopoverRecursiveError} from './popover-errors';
import {NgPatPopoverItem} from './popover-item';
import {NGPAT_POPOVER_PANEL, NgPatPopoverPanel} from './popover-panel';
import {MenuPositionX, MenuPositionY} from './popover-positions';

/** Injection token that determines the scroll handling while the popover is open. */
export const NGPAT_POPOVER_SCROLL_STRATEGY = new InjectionToken<
  () => ScrollStrategy
>('ng-pat-popover-scroll-strategy');

/** @docs-private */
export function NGPAT_POPOVER_SCROLL_STRATEGY_FACTORY(
  overlay: Overlay
): () => ScrollStrategy {
  return () => overlay.scrollStrategies.reposition();
}

/** @docs-private */
export const NGPAT_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER = {
  provide: NGPAT_POPOVER_SCROLL_STRATEGY,
  deps: [Overlay],
  useFactory: NGPAT_POPOVER_SCROLL_STRATEGY_FACTORY
};

/** Options for binding a passive event listener. */
const passiveEventListenerOptions = normalizePassiveListenerOptions({
  passive: true
});

/**
 * Default top padding of the popover panel.
 * @deprecated No longer being used. Will be removed.
 * @breaking-change 15.0.0
 */
export const MENU_PANEL_TOP_PADDING = 8;

@Directive({
  // eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {
    '[attr.aria-haspopup]': 'popover ? "popover" : null',
    '[attr.aria-expanded]': 'popoverOpen',
    '[attr.aria-controls]': 'popoverOpen ? popover.panelId : null',
    '(click)': '_handleClick($event)',
    '(mousedown)': '_handleMousedown($event)',
    '(keydown)': '_handleKeydown($event)'
  }
})
export abstract class _NgPatPopoverTriggerBase
  implements AfterContentInit, OnDestroy
{
  private _portal!: TemplatePortal;
  private _overlayRef: OverlayRef | null = null;
  private _popoverOpen: boolean = false;
  private _closingActionsSubscription = Subscription.EMPTY;
  private _hoverSubscription = Subscription.EMPTY;
  private _popoverCloseSubscription = Subscription.EMPTY;
  private _scrollStrategy: () => ScrollStrategy;
  private _changeDetectorRef = inject(ChangeDetectorRef);

  /**
   * We're specifically looking for a `ng-patPopover` here since the generic `ng-patPopoverPanel`
   * interface lacks some functionality around nested popovers and animations.
   */
  private _parentMaterialMenu: _NgPatPopoverBase | undefined;

  /**
   * Cached value of the padding of the parent popover panel.
   * Used to offset sub-popovers to compensate for the padding.
   */
  private _parentInnerPadding: number | undefined;

  /**
   * Handles touch start events on the trigger.
   * Needs to be an arrow function so we can easily use addEventListener and removeEventListener.
   */
  private _handleTouchStart = (event: TouchEvent) => {
    if (!isFakeTouchstartFromScreenReader(event)) {
      this._openedBy = 'touch';
    }
  };

  // Tracking input type is necessary so it's possible to only auto-focus
  // the first item of the list when the popover is opened via the keyboard
  // eslint-disable-next-line @typescript-eslint/member-ordering
  _openedBy: Exclude<FocusOrigin, 'program' | null> | undefined = undefined;

  /**
   * @deprecated
   * @breaking-change 8.0.0
   */
  @Input('ng-pat-popover-trigger-for')
  get _deprecatedNgPatPopoverTriggerFor(): NgPatPopoverPanel | null {
    return this.popover;
  }
  set _deprecatedNgPatPopoverTriggerFor(v: NgPatPopoverPanel | null) {
    this.popover = v;
  }

  /** References the popover instance that the trigger is associated with. */
  @Input('ng-patPopoverTriggerFor')
  get popover(): NgPatPopoverPanel | null {
    return this._popover;
  }
  set popover(popover: NgPatPopoverPanel | null) {
    if (popover === this._popover) {
      return;
    }

    this._popover = popover;
    this._popoverCloseSubscription.unsubscribe();

    if (popover) {
      if (popover === this._parentMaterialMenu) {
        throwNgPatPopoverRecursiveError();
      }

      this._popoverCloseSubscription = popover.close.subscribe(
        (reason: MenuCloseReason) => {
          this._destroyMenu(reason);

          // If a click closed the popover, we should close the entire chain of nested popovers.
          if (
            (reason === 'click' || reason === 'tab') &&
            this._parentMaterialMenu
          ) {
            this._parentMaterialMenu.closed.emit(reason);
          }
        }
      );
    }

    this._popoverItemInstance?._setTriggersSubpopover(
      this.triggersSubpopover()
    );
  }
  private _popover!: NgPatPopoverPanel | null; // eslint-disable-line

  /** Data to be passed along to any lazily-rendered content. */
  @Input('ngPatPopoverTriggerData') popoverData: any; // eslint-disable-line

  /**
   * Whether focus should be restored when the popover is closed.
   * Note that disabling this option can have accessibility implications
   * and it's up to you to manage focus, if you decide to turn it off.
   */
  @Input('ngPatPopoverTriggerRestoreFocus') restoreFocus: boolean = true; // eslint-disable-line

  /** Event emitted when the associated popover is opened. */
  @Output() readonly popoverOpened: EventEmitter<void> =
    new EventEmitter<void>();

  /**
   * Event emitted when the associated popover is opened.
   * @deprecated Switch to `popoverOpened` instead
   * @breaking-change 8.0.0
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onPopoverOpen: EventEmitter<void> = this.popoverOpened;

  /** Event emitted when the associated popover is closed. */
  @Output() readonly popoverClosed: EventEmitter<void> =
    new EventEmitter<void>();

  /**
   * Event emitted when the associated popover is closed.
   * @deprecated Switch to `popoverClosed` instead
   * @breaking-change 8.0.0
   */
  // eslint-disable-next-line @angular-eslint/no-output-on-prefix
  @Output() readonly onPopoverClose: EventEmitter<void> = this.popoverClosed;

  constructor(
    overlay: Overlay,
    element: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef,
    scrollStrategy: any,
    parentMenu: NgPatPopoverPanel,
    popoverItemInstance: NgPatPopoverItem,
    dir: Directionality,
    focusMonitor: FocusMonitor,
    ngZone: NgZone
  );

  /**
   * @deprecated `focusMonitor` will become a required parameter.
   * @breaking-change 8.0.0
   */
  constructor(
    overlay: Overlay,
    element: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef,
    scrollStrategy: any,
    parentMenu: NgPatPopoverPanel,
    popoverItemInstance: NgPatPopoverItem,
    dir: Directionality,
    focusMonitor?: FocusMonitor | null
  );

  /**
   * @deprecated `ngZone` will become a required parameter.
   * @breaking-change 15.0.0
   */
  constructor(
    overlay: Overlay,
    element: ElementRef<HTMLElement>,
    viewContainerRef: ViewContainerRef,
    scrollStrategy: any,
    parentMenu: NgPatPopoverPanel,
    popoverItemInstance: NgPatPopoverItem,
    dir: Directionality,
    focusMonitor: FocusMonitor
  );

  constructor(
    private _overlay: Overlay,
    private _element: ElementRef<HTMLElement>,
    private _viewContainerRef: ViewContainerRef,
    @Inject(NGPAT_POPOVER_SCROLL_STRATEGY) scrollStrategy: any,
    @Inject(NGPAT_POPOVER_PANEL) @Optional() parentMenu: NgPatPopoverPanel,
    // `ng-patPopoverTrigger` is commonly used in combination with a `ng-patPopoverItem`.
    // tslint:disable-next-line: lightweight-tokens
    @Optional() @Self() private _popoverItemInstance: NgPatPopoverItem,
    @Optional() private _dir: Directionality,
    private _focusMonitor: FocusMonitor | null,
    private _ngZone?: NgZone
  ) {
    this._scrollStrategy = scrollStrategy;
    this._parentMaterialMenu =
      parentMenu instanceof _NgPatPopoverBase ? parentMenu : undefined;

    _element.nativeElement.addEventListener(
      'touchstart',
      this._handleTouchStart,
      passiveEventListenerOptions
    );
  }

  ngAfterContentInit() {
    this._handleHover();
  }

  ngOnDestroy() {
    if (this._overlayRef) {
      this._overlayRef.dispose();
      this._overlayRef = null;
    }

    this._element.nativeElement.removeEventListener(
      'touchstart',
      this._handleTouchStart,
      passiveEventListenerOptions
    );

    this._popoverCloseSubscription.unsubscribe();
    this._closingActionsSubscription.unsubscribe();
    this._hoverSubscription.unsubscribe();
  }

  /** Whether the popover is open. */
  get popoverOpen(): boolean {
    return this._popoverOpen;
  }

  /** The text direction of the containing app. */
  get dir(): Direction {
    return this._dir && this._dir.value === 'rtl' ? 'rtl' : 'ltr';
  }

  /** Whether the popover triggers a sub-popover or a top-level one. */
  triggersSubpopover(): boolean {
    return !!(
      this._popoverItemInstance &&
      this._parentMaterialMenu &&
      this.popover
    );
  }

  /** Toggles the popover between the open and closed states. */
  toggleMenu(): void {
    return this._popoverOpen ? this.closeMenu() : this.openMenu();
  }

  /** Opens the popover. */
  openMenu(): void {
    const popover = this.popover;

    if (this._popoverOpen || !popover) {
      return;
    }

    const overlayRef = this._createOverlay(popover);
    const overlayConfig = overlayRef.getConfig();
    const positionStrategy =
      overlayConfig.positionStrategy as FlexibleConnectedPositionStrategy;

    this._setPosition(popover, positionStrategy);
    overlayConfig.hasBackdrop =
      popover.hasBackdrop == null
        ? !this.triggersSubpopover()
        : popover.hasBackdrop;
    overlayRef.attach(this._getPortal(popover));

    if (popover.lazyContent) {
      popover.lazyContent.attach(this.popoverData);
    }

    this._closingActionsSubscription = this._popoverClosingActions().subscribe(
      () => this.closeMenu()
    );
    this._initMenu(popover);

    if (popover instanceof _NgPatPopoverBase) {
      popover._startAnimation();
      popover._directDescendantItems.changes
        .pipe(takeUntil(popover.close))
        .subscribe(() => {
          // Re-adjust the position without locking when the amount of items
          // changes so that the overlay is allowed to pick a new optimal position.
          positionStrategy.withLockedPosition(false).reapplyLastPosition();
          positionStrategy.withLockedPosition(true);
        });
    }
  }

  /** Closes the popover. */
  closeMenu(): void {
    this.popover?.close.emit();
  }

  /**
   * Focuses the popover trigger.
   * @param origin Source of the popover trigger's focus.
   */
  focus(origin?: FocusOrigin, options?: FocusOptions) {
    if (this._focusMonitor && origin) {
      this._focusMonitor.focusVia(this._element, origin, options);
    } else {
      this._element.nativeElement.focus(options);
    }
  }

  /**
   * Updates the position of the popover to ensure that it fits all options within the viewport.
   */
  updatePosition(): void {
    this._overlayRef?.updatePosition();
  }

  /** Closes the popover and does the necessary cleanup. */
  private _destroyMenu(reason: MenuCloseReason) {
    if (!this._overlayRef || !this.popoverOpen) {
      return;
    }

    const popover = this.popover;
    this._closingActionsSubscription.unsubscribe();
    this._overlayRef.detach();

    // Always restore focus if the user is navigating using the keyboard or the popover was opened
    // programmatically. We don't restore for non-root triggers, because it can prevent focus
    // from making it back to the root trigger when closing a long chain of popovers by clicking
    // on the backdrop.
    if (
      this.restoreFocus &&
      (reason === 'keydown' || !this._openedBy || !this.triggersSubpopover())
    ) {
      this.focus(this._openedBy);
    }

    this._openedBy = undefined;

    if (popover instanceof _NgPatPopoverBase) {
      popover._resetAnimation();

      if (popover.lazyContent) {
        // Wait for the exit animation to finish before detaching the content.
        popover._animationDone
          .pipe(
            filter(event => event.toState === 'void'),
            take(1),
            // Interrupt if the content got re-attached.
            takeUntil(popover.lazyContent._attached)
          )
          .subscribe({
            next: () => popover.lazyContent!.detach(),
            // No matter whether the content got re-attached, reset the popover.
            complete: () => this._setIsMenuOpen(false)
          });
      } else {
        this._setIsMenuOpen(false);
      }
    } else {
      this._setIsMenuOpen(false);
      popover?.lazyContent?.detach();
    }
  }

  /**
   * This method sets the popover state to open and focuses the first item if
   * the popover was opened via the keyboard.
   */
  private _initMenu(popover: NgPatPopoverPanel): void {
    popover.parentMenu = this.triggersSubpopover()
      ? this._parentMaterialMenu
      : undefined;
    popover.direction = this.dir;
    this._setMenuElevation(popover);
    popover.focusFirstItem(this._openedBy || 'program');
    this._setIsMenuOpen(true);
  }

  /** Updates the popover elevation based on the amount of parent popovers that it has. */
  private _setMenuElevation(popover: NgPatPopoverPanel): void {
    if (popover.setElevation) {
      let depth = 0;
      let parentMenu = popover.parentMenu;

      while (parentMenu) {
        depth++;
        parentMenu = parentMenu.parentMenu;
      }

      popover.setElevation(depth);
    }
  }

  // set state rather than toggle to support triggers sharing a popover
  private _setIsMenuOpen(isOpen: boolean): void {
    if (isOpen !== this._popoverOpen) {
      this._popoverOpen = isOpen;
      this._popoverOpen ? this.popoverOpened.emit() : this.popoverClosed.emit();

      if (this.triggersSubpopover()) {
        this._popoverItemInstance._setHighlighted(isOpen);
      }

      this._changeDetectorRef.markForCheck();
    }
  }

  /**
   * This method creates the overlay from the provided popover's template and saves its
   * OverlayRef so that it can be attached to the DOM when openMenu is called.
   */
  private _createOverlay(popover: NgPatPopoverPanel): OverlayRef {
    if (!this._overlayRef) {
      const config = this._getOverlayConfig(popover);
      this._subscribeToPositions(
        popover,
        config.positionStrategy as FlexibleConnectedPositionStrategy
      );
      this._overlayRef = this._overlay.create(config);

      // Consume the `keydownEvents` in order to prevent them from going to another overlay.
      // Ideally we'd also have our keyboard event logic in here, however doing so will
      // break anybody that may have implemented the `ng-patPopoverPanel` themselves.
      this._overlayRef.keydownEvents().subscribe();
    }

    return this._overlayRef;
  }

  /**
   * This method builds the configuration object needed to create the overlay, the OverlayState.
   * @returns OverlayConfig
   */
  private _getOverlayConfig(popover: NgPatPopoverPanel): OverlayConfig {
    return new OverlayConfig({
      positionStrategy: this._overlay
        .position()
        .flexibleConnectedTo(this._element)
        .withLockedPosition()
        .withGrowAfterOpen()
        .withTransformOriginOn(
          '.ng-pat-popover-panel, .ng-pat-mdc-popover-panel'
        ),
      backdropClass:
        popover.backdropClass || 'cdk-overlay-transparent-backdrop',
      panelClass: popover.overlayPanelClass,
      scrollStrategy: this._scrollStrategy(),
      direction: this._dir
    });
  }

  /**
   * Listens to changes in the position of the overlay and sets the correct classes
   * on the popover based on the new position. This ensures the animation origin is always
   * correct, even if a fallback position is used for the overlay.
   */
  private _subscribeToPositions(
    popover: NgPatPopoverPanel,
    position: FlexibleConnectedPositionStrategy
  ) {
    if (popover.setPositionClasses) {
      position.positionChanges.subscribe(change => {
        const posX: MenuPositionX =
          change.connectionPair.overlayX === 'start' ? 'after' : 'before';
        const posY: MenuPositionY =
          change.connectionPair.overlayY === 'top' ? 'below' : 'above';

        // @breaking-change 15.0.0 Remove null check for `ngZone`.
        // `positionChanges` fires outside of the `ngZone` and `setPositionClasses` might be
        // updating something in the view so we need to bring it back in.
        if (this._ngZone) {
          this._ngZone.run(() => popover.setPositionClasses!(posX, posY));
        } else {
          popover.setPositionClasses!(posX, posY);
        }
      });
    }
  }

  /**
   * Sets the appropriate positions on a position strategy
   * so the overlay connects with the trigger correctly.
   * @param positionStrategy Strategy whose position to update.
   */
  private _setPosition(
    popover: NgPatPopoverPanel,
    positionStrategy: FlexibleConnectedPositionStrategy
  ) {
    let [originX, originFallbackX]: HorizontalConnectionPos[] =
      popover.xPosition === 'before' ? ['end', 'start'] : ['start', 'end'];

    const [overlayY, overlayFallbackY]: VerticalConnectionPos[] =
      popover.yPosition === 'above' ? ['bottom', 'top'] : ['top', 'bottom'];

    let [originY, originFallbackY] = [overlayY, overlayFallbackY];
    let [overlayX, overlayFallbackX] = [originX, originFallbackX];
    let offsetY = 0;

    if (this.triggersSubpopover()) {
      // When the popover is a sub-popover, it should always align itself
      // to the edges of the trigger, instead of overlapping it.
      overlayFallbackX = originX =
        popover.xPosition === 'before' ? 'start' : 'end';
      originFallbackX = overlayX = originX === 'end' ? 'start' : 'end';

      if (this._parentMaterialMenu) {
        if (this._parentInnerPadding == null) {
          const firstItem = this._parentMaterialMenu.items.first;
          this._parentInnerPadding = firstItem
            ? firstItem._getHostElement().offsetTop
            : 0;
        }

        offsetY =
          overlayY === 'bottom'
            ? this._parentInnerPadding
            : -this._parentInnerPadding;
      }
    } else if (!popover.overlapTrigger) {
      originY = overlayY === 'top' ? 'bottom' : 'top';
      originFallbackY = overlayFallbackY === 'top' ? 'bottom' : 'top';
    }

    positionStrategy.withPositions([
      {originX, originY, overlayX, overlayY, offsetY},
      {
        originX: originFallbackX,
        originY,
        overlayX: overlayFallbackX,
        overlayY,
        offsetY
      },
      {
        originX,
        originY: originFallbackY,
        overlayX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      },
      {
        originX: originFallbackX,
        originY: originFallbackY,
        overlayX: overlayFallbackX,
        overlayY: overlayFallbackY,
        offsetY: -offsetY
      }
    ]);
  }

  /** Returns a stream that emits whenever an action that should close the popover occurs. */
  private _popoverClosingActions() {
    const backdrop = this._overlayRef!.backdropClick();
    const detachments = this._overlayRef!.detachments();
    const parentClose = this._parentMaterialMenu
      ? this._parentMaterialMenu.closed
      : observableOf();
    const hover = this._parentMaterialMenu
      ? this._parentMaterialMenu._hovered().pipe(
          filter(active => active !== this._popoverItemInstance),
          filter(() => this._popoverOpen)
        )
      : observableOf();

    return merge(
      backdrop,
      parentClose as Observable<MenuCloseReason>,
      hover,
      detachments
    );
  }

  /** Handles mouse presses on the trigger. */
  _handleMousedown(event: MouseEvent): void {
    if (!isFakeMousedownFromScreenReader(event)) {
      // Since right or middle button clicks won't trigger the `click` event,
      // we shouldn't consider the popover as opened by mouse in those cases.
      this._openedBy = event.button === 0 ? 'mouse' : undefined;

      // Since clicking on the trigger won't close the popover if it opens a sub-popover,
      // we should prevent focus from moving onto it via click to avoid the
      // highlight from lingering on the popover item.
      if (this.triggersSubpopover()) {
        event.preventDefault();
      }
    }
  }

  /** Handles key presses on the trigger. */
  _handleKeydown(event: KeyboardEvent): void {
    const keyCode = event.keyCode;

    // Pressing enter on the trigger will trigger the click handler later.
    if (keyCode === ENTER || keyCode === SPACE) {
      this._openedBy = 'keyboard';
    }

    if (
      this.triggersSubpopover() &&
      ((keyCode === RIGHT_ARROW && this.dir === 'ltr') ||
        (keyCode === LEFT_ARROW && this.dir === 'rtl'))
    ) {
      this._openedBy = 'keyboard';
      this.openMenu();
    }
  }

  /** Handles click events on the trigger. */
  _handleClick(event: MouseEvent): void {
    if (this.triggersSubpopover()) {
      // Stop event propagation to avoid closing the parent popover.
      event.stopPropagation();
      this.openMenu();
    } else {
      this.toggleMenu();
    }
  }

  /** Handles the cases where the user hovers over the trigger. */
  private _handleHover() {
    // Subscribe to changes in the hovered item in order to toggle the panel.
    if (!this.triggersSubpopover() || !this._parentMaterialMenu) {
      return;
    }

    this._hoverSubscription = this._parentMaterialMenu
      ._hovered()
      // Since we might have multiple competing triggers for the same popover (e.g. a sub-popover
      // with different data and triggers), we have to delay it by a tick to ensure that
      // it won't be closed immediately after it is opened.
      .pipe(
        filter(
          active => active === this._popoverItemInstance && !active.disabled
        ),
        delay(0, asapScheduler)
      )
      .subscribe(() => {
        this._openedBy = 'mouse';

        // If the same popover is used between multiple triggers, it might still be animating
        // while the new trigger tries to re-open it. Wait for the animation to finish
        // before doing so. Also interrupt if the user moves to another item.
        if (
          this.popover instanceof _NgPatPopoverBase &&
          this.popover._isAnimating
        ) {
          // We need the `delay(0)` here in order to avoid
          // 'changed after checked' errors in some cases. See #12194.
          this.popover._animationDone
            .pipe(
              take(1),
              delay(0, asapScheduler),
              takeUntil(this._parentMaterialMenu!._hovered())
            )
            .subscribe(() => this.openMenu());
        } else {
          this.openMenu();
        }
      });
  }

  /** Gets the portal that should be attached to the overlay. */
  private _getPortal(popover: NgPatPopoverPanel): TemplatePortal {
    // Note that we can avoid this check by keeping the portal on the popover panel.
    // While it would be cleaner, we'd have to introduce another required method on
    // `ng-patPopoverPanel`, making it harder to consume.
    if (!this._portal || this._portal.templateRef !== popover.templateRef) {
      this._portal = new TemplatePortal(
        popover.templateRef,
        this._viewContainerRef
      );
    }

    return this._portal;
  }
}

/** Directive applied to an element that should trigger a `ng-pat-popover`. */
@Directive({
  selector: `[ng-pat-popover-trigger-for], [ng-patPopoverTriggerFor]`,
  host: {
    class: 'ng-pat-mdc-popover-trigger'
  },
  exportAs: 'ng-patPopoverTrigger'
})
// eslint-disable-next-line @angular-eslint/directive-class-suffix
export class NgPatPopoverTrigger extends _NgPatPopoverTriggerBase {}
