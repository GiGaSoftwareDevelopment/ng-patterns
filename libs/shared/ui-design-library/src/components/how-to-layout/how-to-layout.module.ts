import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HowToPageTitleComponent } from './page-title/how-to-page-title.component';
import { HowToSectionHeaderComponent } from './section-header/how-to-section-header.component';
import { HowToSectionContentComponent } from './section-content/how-to-section-content.component';
import { HowToPageHeaderComponent } from './page-header/how-to-page-header.component';

@NgModule({
  declarations: [
    HowToPageTitleComponent,
    HowToSectionHeaderComponent,
    HowToSectionContentComponent,
    HowToPageHeaderComponent
  ],
  imports: [CommonModule],
  exports: [
    HowToPageTitleComponent,
    HowToSectionHeaderComponent,
    HowToSectionContentComponent,
    HowToPageHeaderComponent
  ]
})
export class HowToLayoutModule {}
