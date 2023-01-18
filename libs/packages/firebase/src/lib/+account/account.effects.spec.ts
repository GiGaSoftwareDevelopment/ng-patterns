// import { TestBed } from '@angular/core/testing';
//
// import { EffectsModule } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { StoreModule } from '@ngrx/store';
//
// import { DataPersistence, NxModule } from '@nrwl/nx';
// import { hot } from '@nrwl/nx/testing';
//
// import { Observable } from 'rxjs';
// import { AccountLoaded } from './account.actions';
//
// import { AccountEffects } from './account.effects';
//
// describe('AccountEffects', () => {
//   let actions: Observable<any>;
//   let effects: AccountEffects;
//
//   beforeEach(() => {
//     TestBed.configureTestingModule({
//       imports: [
//         NxModule.forRoot(),
//         StoreModule.forRoot({}),
//         EffectsModule.forRoot([])
//       ],
//       providers: [
//         AccountEffects,
//         DataPersistence,
//         provideMockActions(() => actions)
//       ]
//     });
//
//     effects = TestBed.inject(AccountEffects);
//   });
//
//   describe('loadAccount$', () => {
//     it('should work', () => {
//       actions = hot('-a-|', { a: new LoadAccount() });
//       expect(effects.loadAccount$).toBeObservable(
//         hot('-a-|', { a: new AccountLoaded([]) })
//       );
//     });
//   });
// });
