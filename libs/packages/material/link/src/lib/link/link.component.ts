import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { ThemePalette } from '@angular/material/core';
import { WindowService } from '@ngpat/utils';
import { ButtonLinkComponent } from '../button-link/button-link.component';

@Component({
  selector: 'ng-pat-link',
  standalone: true,
  imports: [CommonModule, MatIconModule, ButtonLinkComponent],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LinkComponent {
  private _href: string | undefined;

  /**
   * Link url
   * @param link
   */
  @Input()
  set href(link) {
    this._href = link;
  }

  get href() {
    return this._href;
  }

  private _showIcon = true;

  /**
   * Show or hide link icon. Defaults to true.
   * @param value
   */
  @Input()
  set showIcon(value: boolean) {
    this._showIcon = value;
  }

  get showIcon() {
    return this._showIcon;
  }

  @Input() color: ThemePalette = 'primary';

  constructor(private _elementRef: ElementRef, private _win: WindowService) {}
}
