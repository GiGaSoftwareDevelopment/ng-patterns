import {
  addMissingUserAccountProperties,
  hasAllUserAccountProperties
} from './account.fns';
import {UserAccount} from './account.model';

describe('account.fns', () => {
  it('should return true of all properties defined', () => {
    const userAccount = <UserAccount>{
      createdAt: null,
      displayName: null,
      email: null,
      linkCode: null,
      mentoringMeAccounts: null,
      mentoringAccounts: null,
      promoCode: null,
      uid: null,
      updatedAt: null,
      username: null
    };

    expect(hasAllUserAccountProperties(userAccount)).toBe(true);
  });

  it('should return false of any of the properties are not defined', () => {
    const userAccount = <UserAccount>{
      createdAt: null,
      displayName: null,
      email: null,
      linkCode: null,
      // mentoringMeAccounts: null,
      mentoringAccounts: null,
      promoCode: null,
      uid: null,
      updatedAt: null,
      username: null
    };

    expect(hasAllUserAccountProperties(userAccount)).toBe(false);
  });

  it('should add missing account properties', () => {
    const userAccount = <UserAccount>{
      createdAt: null,
      displayName: null,
      email: null,
      // linkCode: null,
      // mentoringMeAccounts: null,
      mentoringAccounts: null,
      promoCode: null,
      uid: null,
      updatedAt: null,
      username: null
    };

    expect(userAccount.linkCode).not.toBeDefined();
    expect(userAccount.mentoringMeAccounts).not.toBeDefined();

    const updated = addMissingUserAccountProperties(userAccount);

    expect(updated.linkCode).toBeDefined();
    expect(updated.mentoringMeAccounts).toBeDefined();
  });
});
