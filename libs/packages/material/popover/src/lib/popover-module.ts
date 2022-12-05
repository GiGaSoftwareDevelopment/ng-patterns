import {OverlayModule} from '@angular/cdk/overlay';
import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCommonModule, MatRippleModule} from '@angular/material/core';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {UiPopover} from './popover';
import {UiPopoverContent} from './popover-content';
import {UiPopoverItem} from './popover-item';
import {UI_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER, UiPopoverTrigger} from './popover-trigger';

@NgModule({
  imports: [CommonModule, MatCommonModule, MatRippleModule, OverlayModule],
  exports: [CdkScrollableModule, MatCommonModule, UiPopover, UiPopoverItem, UiPopoverTrigger, UiPopoverContent],
  declarations: [UiPopover, UiPopoverItem, UiPopoverTrigger, UiPopoverContent],
  providers: [UI_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class UiPopoverModule {}
