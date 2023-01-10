import {keysAreTruthyInCollection} from '../collection/keysAreTruthyInCollection';
import values from '../lodash/values';

export function keysAreTruthyInEntity<T>(
  entity: {[key: string]: T},
  keys: string | string[]
): boolean {
  return keysAreTruthyInCollection(values(entity), keys);
}
