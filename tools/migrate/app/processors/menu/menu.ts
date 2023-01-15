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

    if (d.path.includes('material/menu/menu.scss')) {
      d.content = d.content.replace(/popover\-common/g, 'menu-common');
      d.content = d.content.replace(/menu-common\.item-subpopover/g, 'menu-common.item-submenu');
    }

    if (d.path.includes('material/menu/menu.html')) {
      d.content = d.content.replace('(click)="closed.emit(\'click\')"', '');
    }
  }

  d.path = d.path.replace(/menu/g, 'popover');

  return d;
}

export const menuModuleConfig: ProcessorFunctionConfig = {
  name: 'menuModule',
  func: menuModule
};
