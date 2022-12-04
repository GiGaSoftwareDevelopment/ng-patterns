import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import { EffectsModule } from '@ngrx/effects';
import { UiEffects } from './+state/ui/ui.effects';

@NgModule({
  imports: [CommonModule, EffectsModule.forFeature([UiEffects])]
})
export class PatternsDomainModule {}
