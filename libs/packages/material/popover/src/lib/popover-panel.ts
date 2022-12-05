import {EventEmitter, TemplateRef, InjectionToken} from '@angular/core';
import {MenuPositionX, MenuPositionY} from './popover-positions';
import {Direction} from '@angular/cdk/bidi';
import {FocusOrigin} from '@angular/cdk/a11y';
import {UiPopoverContent} from './popover-content';

/**
 * Injection token used to provide the parent popover to popover-specific components.
 * @docs-private
 */
export const UI_POPOVER_PANEL = new InjectionToken<UiPopoverPanel>('UI_POPOVER_PANEL');

/**
 * Interface for a custom popover panel that can be used with `uiPopoverTriggerFor`.
 * @docs-private
 */
export interface UiPopoverPanel<T = any> {
  xPosition: MenuPositionX;
  yPosition: MenuPositionY;
  overlapTrigger: boolean;
  templateRef: TemplateRef<any>;
  readonly close: EventEmitter<void | 'click' | 'keydown' | 'tab'>;
  parentMenu?: UiPopoverPanel | undefined;
  direction?: Direction;
  focusFirstItem: (origin?: FocusOrigin) => void;
  resetActiveItem: () => void;
  setPositionClasses?: (x: MenuPositionX, y: MenuPositionY) => void;
  setElevation?(depth: number): void;
  lazyContent?: UiPopoverContent;
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
