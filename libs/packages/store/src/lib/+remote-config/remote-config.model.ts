import {EntityState} from '@ngrx/entity';

export interface NgPatRemoteConfigEntity {
  id: string;
  value: number | string;
}

export type NgPatRemoteConfigState = EntityState<NgPatRemoteConfigEntity>;
