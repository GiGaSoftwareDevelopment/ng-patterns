import { Update } from '@ngrx/entity';

export function aggregateUpdates<T extends {id: string}>(updates: T[]): Update<T>[] {
  return updates.map((i: T) => {
    return {
      id: (<{id: string}>i).id,
      changes: i
    };
  });
}
