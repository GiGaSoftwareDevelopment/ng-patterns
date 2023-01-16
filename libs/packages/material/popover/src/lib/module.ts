

import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCommonModule, MatRippleModule} from '@angular/material/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {UiuxPopover} from './popover';
import {UiuxPopoverItem} from './popover-item';
import {UiuxPopoverContent} from './popover-content';
import {UIUX_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER, UiuxPopoverTrigger} from './popover-trigger';

@NgModule({
  imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule],
  exports: [
    CdkScrollableModule,
    UiuxPopover,
    MatCommonModule,
    UiuxPopoverItem,
    UiuxPopoverContent,
    UiuxPopoverTrigger,
  ],
  declarations: [UiuxPopover, UiuxPopoverItem, UiuxPopoverContent, UiuxPopoverTrigger],
  providers: [UIUX_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER],
})
export class UiuxPopoverModule {}
