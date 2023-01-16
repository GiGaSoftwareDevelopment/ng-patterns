import {FileData, ProcessorFunctionConfig} from '../../model';

export function menuModule(d: FileData): FileData {
  if (d.path.includes('material/menu') && !d.path.includes('material/menu/README.md')) {
    // ../core/style/button-common
    d.content = d.content.replace(/\.\.\/core/g, '../../../src/lib/styles/core');

    // ../../cdk
    d.content = d.content.replace(/\.\.\/\.\.\/cdk/g, '@angular/cdk');

    d.content = d.content.replace(/mat-menu/g, 'uiux-popover');
    d.content = d.content.replace(/mat-mdc-menu/g, 'uiux-mdc-popover');
    d.content = d.content.replace(/matMenu/g, 'uiuxPopover');
    d.content = d.content.replace(/MatMenu/g, 'UiuxPopover');
    d.content = d.content.replace(/MAT_MENU/g, 'UIUX_POPOVER');
    d.content = d.content.replace(/menu/g, 'popover');
    d.content = d.content.replace(/onMenu/g, 'onPopover');
    d.content = d.content.replace(/tslint\:disable\-next\-line\:no\-output\-on\-prefix/g, 'eslint-disable-next-line @angular-eslint/no-output-on-prefix');

    if (d.path.includes('material/menu/menu.scss')) {
      d.content = d.content.replace(/popover\-common/g, 'menu-common');
      d.content = d.content.replace(/menu-common\.item-subpopover/g, 'menu-common.item-submenu');
    }

    if (d.path.includes('material/menu/menu.html')) {
      d.content = d.content.replace('(click)="closed.emit(\'click\')"', '');
    }

    if (d.path.includes('material/menu/menu.ts')) {

      // Fix initializers
      d.content = d.content.replace('private _keyManager: FocusKeyManager<UiuxPopoverItem>', 'private _keyManager!: FocusKeyManager<UiuxPopoverItem>');
      d.content = d.content.replace('private _previousElevation: string;', 'private _previousElevation!: string;');
      d.content = d.content.replace('protected _elevationPrefix: string', 'protected _elevationPrefix!: string');
      d.content = d.content.replace('protected _baseElevation: number;', 'protected _baseElevation!: number;');
      d.content = d.content.replace('_allItems: QueryList<UiuxPopoverItem>;', '_allItems!: QueryList<UiuxPopoverItem>;');
      d.content = d.content.replace('_isAnimating: boolean;', '_isAnimating!: boolean;');
      d.content = d.content.replace('direction: Direction;', 'direction!: Direction;');
      d.content = d.content.replace('@Input(\'aria-label\') ariaLabel: string;', '@Input(\'aria-label\') ariaLabel!: string;');
      d.content = d.content.replace('@Input(\'aria-labelledby\') ariaLabelledby: string;', '@Input(\'aria-labelledby\') ariaLabelledby!: string;');
      d.content = d.content.replace('@Input(\'aria-describedby\') ariaDescribedby: string;', '@Input(\'aria-describedby\') ariaDescribedby!: string;');
      d.content = d.content.replace('@ViewChild(TemplateRef) templateRef: TemplateRef<any>;', '@ViewChild(TemplateRef) templateRef!: TemplateRef<any>;');
      d.content = d.content.replace('items: QueryList<UiuxPopoverItem>;', 'items!: QueryList<UiuxPopoverItem>;');
      d.content = d.content.replace('lazyContent: UiuxPopoverContent;', 'lazyContent!: UiuxPopoverContent;');
      d.content = d.content.replace('@Input(\'class\')', '@Input(\'class\') // eslint-disable-line');
      d.content = d.content.replace('private _previousPanelClass: string;', 'private _previousPanelClass!: string;');
      d.content = d.content.replace('@Output() readonly close: EventEmitter<MenuCloseReason> = this.closed;', `// eslint-disable-next-line @angular-eslint/no-output-native
  @Output() readonly close: EventEmitter<MenuCloseReason> = this.closed;`);
      d.content = d.content.replace('addItem(_item: UiuxPopoverItem) {}', 'addItem(_item: UiuxPopoverItem) {} // eslint-disable-line');
      d.content = d.content.replace('removeItem(_item: UiuxPopoverItem) {}', 'removeItem(_item: UiuxPopoverItem) {} // eslint-disable-line');
      d.content = d.content.replace('this._directDescendantItems.first!._getHostElement().closest(\'[role="popover"]\');', 'this._directDescendantItems.first!._getHostElement().closest(\'[role="popover"]\'); // eslint-disable-line');
      d.content = d.content.replace('export class UiuxPopover extends _UiuxPopoverBase {', `// eslint-disable-next-line @angular-eslint/component-class-suffix
export class UiuxPopover extends _UiuxPopoverBase {`);
      d.content = d.content.replace('host: {', `// eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {`);

    }

    if (d.path.includes('material/menu/menu-content.ts')) {
      d.content = d.content.replace('private _portal: TemplatePortal<any>;', 'private _portal!: TemplatePortal<any>;');
      d.content = d.content.replace('private _outlet: DomPortalOutlet;', 'private _outlet!: DomPortalOutlet;');
      d.content = d.content.replace('', '');
    }

    if (d.path.includes('material/menu/menu-trigger.ts')) {
      d.content = d.content.replace('host: {', `// eslint-disable-next-line @angular-eslint/no-host-metadata-property
  host: {`);
      d.content = d.content.replace('_openedBy: Exclude<FocusOrigin', `// eslint-disable-next-line @typescript-eslint/member-ordering
  _openedBy: Exclude<FocusOrigin`);
      d.content = d.content.replace('private _popover: UiuxPopoverPanel | null;', `private _popover: UiuxPopoverPanel | null; // eslint-disable-line`);
      d.content = d.content.replace('@Input(\'uiuxPopoverTriggerData\') popoverData: any;', `@Input('uiuxPopoverTriggerData') popoverData: any; // eslint-disable-line`);
      d.content = d.content.replace('@Input(\'uiuxPopoverTriggerRestoreFocus\') restoreFocus: boolean = true;', `@Input('uiuxPopoverTriggerRestoreFocus') restoreFocus: boolean = true; // eslint-disable-line`);
      d.content = d.content.replace('private _portal: TemplatePortal;', `private _portal!: TemplatePortal;`);
      d.content = d.content.replace('private _popover: UiuxPopoverPanel | null;', `private _popover!: UiuxPopoverPanel | null;`);
    }

    // Revert back replacesments
    d.content = d.content.replace(/popover\-surface/g, 'menu-surface');
  }

  d.path = d.path.replace(/menu/g, 'popover');

  return d;
}

export const menuModuleConfig: ProcessorFunctionConfig = {
  name: 'menuModule',
  func: menuModule
};
