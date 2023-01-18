import {EntityState} from '@ngrx/entity';

export interface RemoteConfigEntity {
  id: string;
  value: number | string;
}

export type RemoteConfigState = EntityState<RemoteConfigEntity>;
