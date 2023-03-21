import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HighlightTypescriptComponent } from './highlight-typescript/highlight-typescript.component';
import { HighlightHtmlComponent } from './highlight-html/highlight-html.component';
import { HighlightScssComponent } from './highlight-scss/highlight-scss.component';
import { HighlightBashComponent } from './highlight-bash/highlight-bash.component';
import { HighlightModule } from 'ngx-highlightjs';

@NgModule({
  declarations: [
    HighlightTypescriptComponent,
    HighlightHtmlComponent,
    HighlightScssComponent,
    HighlightBashComponent
  ],
  imports: [CommonModule, HighlightModule],
  exports: [
    HighlightTypescriptComponent,
    HighlightHtmlComponent,
    HighlightScssComponent,
    HighlightBashComponent
  ]
})
export class CodeHighlightModule {}
