import { createSelector, MemoizedSelector } from '@ngrx/store';
import { Dictionary } from '@ngrx/entity/src/models';


/**
 * Returns entities that have been deleted from the store.
 *
 * @param entitySelector the selector for enitites in an NgRX Entity Store
 */
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

export interface NgPatAddedAndDeletedEntities<T> {
  addedEntities: T[];
  deletedEntities: T[];
}

/**
 *
 * Returns entites that have been added and deleted from the store.
 *
 * @param entitySelector the selector for enitites in an NgRX Entity Store
 */
export const selectNgPatAddedAndDeletedEntities = <T>(entitySelector: MemoizedSelector<any, any>) => {

  let currentEntities: Dictionary<T> = {}

  return createSelector(
    entitySelector,
    (newEntities: Dictionary<T>): NgPatAddedAndDeletedEntities<T> => {

      /**
       * Look through current entities and find any that are not in the new entities
       */
      const deletedEntities = Object.keys(currentEntities)
        .reduce((result: { [key: string]: T }, key: string) => {
          /**
           * If the current entity is not in the new entities, then it has been deleted
           */
          if (!newEntities[key] && currentEntities[key]) {
            /**
             * Add the deleted entity to the result
             */
            result[key] = <T>currentEntities[key];
          }
          return result;
        }, {});

      /**
       * Look through new entities and find any that are not in the current entities
       */
      const addedEntities = Object.keys(newEntities)
        .reduce((result: { [key: string]: T }, key: string) => {
          /**
           * If the new entity is not in the current entities, then it has been added
           */
          if (!currentEntities[key] && newEntities[key]) {
            /**
             * Add the added entity to the result
             */
            result[key] = <T>newEntities[key];
          }
          return result;
        }, {});

      /**
       * Update the current entities
       */
      currentEntities = {
        ...newEntities
      };

      return {
        addedEntities: Object.values(addedEntities),
        deletedEntities: Object.values(deletedEntities)
      }

    }
  );
}
