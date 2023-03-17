import {NgPatBrowserStorageItem} from '@ngpat/store';
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

    const expected: NgPatBrowserStorageItem = {
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

    const browserStorageItem: NgPatBrowserStorageItem = {
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

    const expected: NgPatBrowserStorageItem = {
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

    expect(
      createCurrentRoutesStorage(browserStorageItem, item, menuID)
    ).toEqual(expected);
  });

  it('should not add LocalStorage structure with route', () => {
    const item: GigaSidenavListItem = {
      route: ['baz', 'bum'],
      title: 'BazBum',
      icon: 'an-icon-2'
    };

    const browserStorageItem: NgPatBrowserStorageItem = {
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

    const expected: NgPatBrowserStorageItem = {
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

    expect(
      createCurrentRoutesStorage(browserStorageItem, item, menuID)
    ).toEqual(expected);
  });

  it('should delete route item and re-sort', () => {
    const item: GigaSidenavListItem = {
      route: ['foo', 'bar'],
      title: 'FooBar',
      icon: 'an-icon'
    };

    const browserStorageItem: NgPatBrowserStorageItem = {
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

    const expected: NgPatBrowserStorageItem = {
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

    expect(
      removeCurrentRoutesStorage(browserStorageItem, item, menuID)
    ).toEqual(expected);
  });
});
