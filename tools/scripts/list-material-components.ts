const matList = [
  'autocomplete',
  'badge',
  'bottom-sheet',
  'button',
  'button-toggle',
  'card',
  'checkbox',
  'chips',
  'datepicker',
  'dialog',
  'divider',
  'expansion',
  'form-field',
  'grid-list',
  'icon',
  'input',
  'list',
  'menu',
  'paginator',
  'progress-bar',
  'progress-spinner',
  'radio',
  'select',
  'sidenav',
  'slide-toggle',
  'slider',
  'snack-bar',
  'sort',
  'stepper',
  'table',
  'tabs',
  'toolbar',
  'tooltip',
  'tree'
];

matList.forEach((matComponentName: string) => {
  // console.log(
  //   `@use 'mat-${matComponentName}-override' as ${matComponentName};`
  // );
  // console.log(`@include ${matComponentName}.theme($theme);`);
  // console.log(`@include ${matComponentName}.color($theme);`);
  console.log(`@include ${matComponentName}.styles();`);
});
