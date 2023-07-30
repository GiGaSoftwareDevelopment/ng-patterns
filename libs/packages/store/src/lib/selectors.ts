import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';


export const selectNgPatDeletedEntities = <T>(entitySelector: MemoizedSelector<any, any>) => {

  let currentEntities: Dictionary<T> = {}

  return createSelector(
    entitySelector,
    (entities: Dictionary<T>): T[] => {

      const deletedEntities = Object.keys(currentEntities)
        .reduce((result: { [key: string]: T }, key: string) => {
          if (!entities[key] && currentEntities[key]) {
            result[key] = <T>currentEntities[key];
          }
          return result;
        }, {});

      currentEntities = {
        ...entities
      };

      return Object.values(deletedEntities);
    }
  );
}
