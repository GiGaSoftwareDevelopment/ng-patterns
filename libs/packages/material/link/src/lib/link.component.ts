import {
  ChangeDetectionStrategy,
  Component, ElementRef, Input, OnInit,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import { CanColor, mixinColor } from '@angular/material/core';
import { MatIconModule } from '@angular/material/icon';
import { WindowService } from '@ngpat/utils';

const colorMixin = mixinColor(class {
  constructor(public _elementRef: ElementRef) {}
}, 'primary');


@Component({
  // eslint-disable-next-line @angular-eslint/component-selector
  selector: 'button[ng-pat-link]',
  standalone: true,
  imports: [ CommonModule, MatIconModule ],
  templateUrl: './link.component.html',
  styleUrls: ['./link.component.scss'],
  exportAs: 'ngPatLink',
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color'],
  host: {
    class: 'ng-pat-link'
  }
})
export class LinkComponent extends colorMixin implements CanColor, OnInit {

  private _href: string | undefined;

  @Input()
  set href(value) {
    this._href = value;
  }

  get href() {
    return this._href;
  }

  constructor(elementRef: ElementRef, private _win: WindowService) {
    super(elementRef);
  }

  ngOnInit() {

    this._elementRef.nativeElement.addEventListener('click', (event: Event) => {
      if (this.href) {
        this._win.open(this.href);
      }
    })
  }

}
