export function aggregateUpdates<T extends {id: string}>(updates: T[]) {
  return updates.map((i: T) => {
    return {
      id: (<{id: string}>i).id,
      changes: i
    };
  });
}
