import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  HostBinding,
  Input,
  Output,
  ViewEncapsulation
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule, MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'design-library-ng-pat-logo',
  standalone: true,
  imports: [CommonModule, MatIconModule],
  templateUrl: './ng-pat-logo.component.html',
  styleUrls: ['./ng-pat-logo.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'design-library-ng-pat-logo',
    '[style.height.px]': 'this.height',
    '[style.width.px]': 'this.width'
  }
})
export class NgPatLogoComponent {
  @HostBinding('class.design-library-ng-pat-logo') hostClass = true;

  ngPatLogo = 'ngPatLogo';
  ngPatLogoReversed = 'ngPatLogoReversed';

  @Input() reversed = false;

  @Output() clickAction: EventEmitter<boolean> = new EventEmitter<boolean>();

  private _height = 24;
  @Input()
  set height(value: number) {
    this._height = value;
  }

  get height() {
    return this._height;
  }

  private _width = 24;
  @Input()
  set width(value: number) {
    this._width = value;
  }

  get width() {
    return this._width;
  }

  constructor(iconRegistry: MatIconRegistry, sanitizer: DomSanitizer) {
    iconRegistry.addSvgIcon(
      this.ngPatLogo,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/ng-pat-logo.svg'
      )
    );

    iconRegistry.addSvgIcon(
      this.ngPatLogoReversed,
      sanitizer.bypassSecurityTrustResourceUrl(
        'assets/ui-design-library/ng-pat-logo-reversed.svg'
      )
    );
  }
}
