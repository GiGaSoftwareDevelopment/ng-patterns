import {NgModule} from '@angular/core';
import {UiResizeObserverDirective} from './resize-observer';

@NgModule({
  declarations: [UiResizeObserverDirective],
  exports: [UiResizeObserverDirective]
})
export class UiResizeObserverModule {}
