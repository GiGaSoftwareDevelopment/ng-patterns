import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {MatCommonModule, MatRippleModule} from '@angular/material/core';
import {OverlayModule} from '@angular/cdk/overlay';
import {CdkScrollableModule} from '@angular/cdk/scrolling';
import {NgPatPopover} from './popover';
import {NgPatPopoverItem} from './popover-item';
import {NgPatPopoverContent} from './popover-content';
import {
  NGPAT_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER,
  NgPatPopoverTrigger
} from './popover-trigger';

@NgModule({
  imports: [CommonModule, MatRippleModule, MatCommonModule, OverlayModule],
  exports: [
    CdkScrollableModule,
    NgPatPopover,
    MatCommonModule,
    NgPatPopoverItem,
    NgPatPopoverContent,
    NgPatPopoverTrigger
  ],
  declarations: [
    NgPatPopover,
    NgPatPopoverItem,
    NgPatPopoverContent,
    NgPatPopoverTrigger
  ],
  providers: [NGPAT_POPOVER_SCROLL_STRATEGY_FACTORY_PROVIDER]
})
export class NgPatPopoverModule {}
