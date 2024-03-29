import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  Input,
  ViewEncapsulation
} from '@angular/core';
import {CommonModule} from '@angular/common';
import {
  NgPatSidenavMenuFactoryService,
  SidenavMenuService
} from '../ng-pat-sidenav-menu-factory.service';
import {ReplaySubject} from 'rxjs';
import {LetDirective, PushPipe} from '@ngrx/component';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector:
    'ng-pat-logo, [ngPatLogo], mat-icon[ngPatLogo], mat-icon[ng-pat-logo]',
  standalone: true
})
export class NgPatLogoDirective {}

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'ng-pat-title, [ngPatTitle]',
  standalone: true
})
export class NgPatTitleDirective {}

@Component({
  selector: 'ng-pat-sidenav-header',
  standalone: true,
  imports: [CommonModule, PushPipe, LetDirective],
  templateUrl: './sidenav-header.component.html',
  styleUrls: ['./sidenav-header.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'ng-pat-sidenav-header'
  }
})
export class SidenavHeaderComponent {
  private _height = 48;
  @Input()
  set height(value: number) {
    this._height = value;
  }

  get height(): number {
    return this._height;
  }

  private _menuSevice: ReplaySubject<SidenavMenuService> =
    new ReplaySubject<SidenavMenuService>(1);

  @Input()
  set menuServiceID(menuServiceID: string) {
    this._menuSevice.next(this.menuSvc.getService(menuServiceID));
  }

  constructor(private menuSvc: NgPatSidenavMenuFactoryService) {}
}
