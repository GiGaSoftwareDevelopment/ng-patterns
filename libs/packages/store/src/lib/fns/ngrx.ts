import { Update } from '@ngrx/entity';

export function ngPatCreateUpdate(v: any, id = 'id'): Update<any> {
  return {
    id: v[id],
    changes: v
  };
}

export function ngPatCreateUpdates(v: any[], id = 'id'): Update<any>[] {
  return v.map((_v: any) => {
    return {
      id: _v[id],
      changes: _v
    };
  });
}
