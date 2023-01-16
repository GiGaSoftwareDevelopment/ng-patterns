

import {EventEmitter, TemplateRef, InjectionToken} from '@angular/core';
import {MenuPositionX, MenuPositionY} from './popover-positions';
import {Direction} from '@angular/cdk/bidi';
import {FocusOrigin} from '@angular/cdk/a11y';
import {UiuxPopoverContent} from './popover-content';

/**
 * Injection token used to provide the parent popover to popover-specific components.
 * @docs-private
 */
export const UIUX_POPOVER_PANEL = new InjectionToken<UiuxPopoverPanel>('UIUX_POPOVER_PANEL');

/**
 * Interface for a custom popover panel that can be used with `uiuxPopoverTriggerFor`.
 * @docs-private
 */
export interface UiuxPopoverPanel<T = any> {
  xPosition: MenuPositionX;
  yPosition: MenuPositionY;
  overlapTrigger: boolean;
  templateRef: TemplateRef<any>;
  readonly close: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
  parentMenu?: UiuxPopoverPanel | undefined;
  direction?: Direction;
  focusFirstItem: (origin?: FocusOrigin) => void;
  resetActiveItem: () => void;
  setPositionClasses?: (x: MenuPositionX, y: MenuPositionY) => void;
  setElevation?(depth: number): void;
  lazyContent?: UiuxPopoverContent;
  backdropClass?: string;
  overlayPanelClass?: string | string[];
  hasBackdrop?: boolean;
  readonly panelId?: string;

  /**
   * @deprecated To be removed.
   * @breaking-change 8.0.0
   */
  addItem?: (item: T) => void;

  /**
   * @deprecated To be removed.
   * @breaking-change 8.0.0
   */
  removeItem?: (item: T) => void;
}
