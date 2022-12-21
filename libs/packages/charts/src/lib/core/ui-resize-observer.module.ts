import {NgModule} from '@angular/core';
import {UiResizeObserverDirective} from './resize-observer';
import { WINDOW_PROVIDERS } from '@uiux/utils';

@NgModule({
  declarations: [UiResizeObserverDirective],
  exports: [UiResizeObserverDirective],
  providers: [
    WINDOW_PROVIDERS
  ]
})
export class UiResizeObserverModule {}
