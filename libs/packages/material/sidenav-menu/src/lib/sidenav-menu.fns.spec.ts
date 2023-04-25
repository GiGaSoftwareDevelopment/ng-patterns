import { NgPatLocalStorageItem } from '@ngpat/store';
import {
  GigaSidenavListItem,
  SidenavMenuLocalStorageItem
} from './sidenav-menu.model';
import {
  createCurrentRoutesStorage,
  removeCurrentRoutesStorage
} from './sidenav-menu.fns';

describe('createCurrentRoutesStorage', () => {
  const menuID = 'main-nav';

  it('should create LocalStorage structure with route', () => {
    const item: GigaSidenavListItem = {
      route: ['foo', 'bar'],
      title: 'FooBar',
      icon: 'an-icon'
    };

    const expected: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item
        }
      }
    };

    expect(createCurrentRoutesStorage(undefined, item, menuID)).toEqual(
      expected
    );
  });

  it('should add LocalStorage structure with route', () => {
    const item: GigaSidenavListItem = {
      route: ['baz', 'bum'],
      title: 'BazBum',
      icon: 'an-icon-2'
    };

    const localStorageItem: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['foo', 'bar'],
            title: 'FooBar',
            icon: 'an-icon'
          }
        }
      }
    };

    const expected: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['foo', 'bar'],
            title: 'FooBar',
            icon: 'an-icon'
          }
        },
        'baz-bum': <SidenavMenuLocalStorageItem>{
          sort: 1,
          item: {
            route: ['baz', 'bum'],
            title: 'BazBum',
            icon: 'an-icon-2'
          }
        }
      }
    };

    expect(createCurrentRoutesStorage(localStorageItem, item, menuID)).toEqual(
      expected
    );
  });

  it('should not add LocalStorage structure with route', () => {
    const item: GigaSidenavListItem = {
      route: ['baz', 'bum'],
      title: 'BazBum',
      icon: 'an-icon-2'
    };

    const localStorageItem: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['foo', 'bar'],
            title: 'FooBar',
            icon: 'an-icon'
          }
        },
        'baz-bum': <SidenavMenuLocalStorageItem>{
          sort: 1,
          item: {
            route: ['baz', 'bum'],
            title: 'BazBum',
            icon: 'an-icon-2'
          }
        }
      }
    };

    const expected: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['foo', 'bar'],
            title: 'FooBar',
            icon: 'an-icon'
          }
        },
        'baz-bum': <SidenavMenuLocalStorageItem>{
          sort: 1,
          item: {
            route: ['baz', 'bum'],
            title: 'BazBum',
            icon: 'an-icon-2'
          }
        }
      }
    };

    expect(createCurrentRoutesStorage(localStorageItem, item, menuID)).toEqual(
      expected
    );
  });

  it('should delete route item and re-sort', () => {
    const item: GigaSidenavListItem = {
      route: ['foo', 'bar'],
      title: 'FooBar',
      icon: 'an-icon'
    };

    const localStorageItem: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'foo-bar': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['foo', 'bar'],
            title: 'FooBar',
            icon: 'an-icon'
          }
        },
        'baz-bum': <SidenavMenuLocalStorageItem>{
          sort: 1,
          item: {
            route: ['baz', 'bum'],
            title: 'BazBum',
            icon: 'an-icon-2'
          }
        }
      }
    };

    const expected: NgPatLocalStorageItem = {
      key: 'sidenav-main-nav',
      value: {
        'baz-bum': <SidenavMenuLocalStorageItem>{
          sort: 0,
          item: {
            route: ['baz', 'bum'],
            title: 'BazBum',
            icon: 'an-icon-2'
          }
        }
      }
    };

    expect(removeCurrentRoutesStorage(localStorageItem, item, menuID)).toEqual(
      expected
    );
  });
});
