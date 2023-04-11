import {
  DocumentChange,
  DocumentData,
  QueryDocumentSnapshot
} from '@firebase/firestore';
import {
  getUpdatedAtSeconds,
  removeTimestampCTorFromDocumentSnapshot
} from '../fns/firestore.fns';
import { NgPatAggregateFirebaseSnapshotChanges } from '../models/firestore.model';

/**
 * @param changes
 * @param id
 * @param mapFirestoreId
 */
export function aggregateDocChanges<T>(
  changes: DocumentChange<DocumentData>[],
  id: string = 'id',
  mapFirestoreId = false
): NgPatAggregateFirebaseSnapshotChanges<T> {
  const accumulator: NgPatAggregateFirebaseSnapshotChanges<T> = {
    added: [],
    modified: [],
    removed: []
  };

  if (changes && changes.length) {
    return (<Array<any>>changes).reduce(function (
      acc: NgPatAggregateFirebaseSnapshotChanges<T>,
      change: DocumentChange<T>
    ) {
      let data: any = removeTimestampCTorFromDocumentSnapshot(
        <QueryDocumentSnapshot<DocumentData>>change.doc
      );

      try {
        data = JSON.parse(JSON.stringify(data));
      } catch (error: any) {
        console.error(error);
      }

      (<any>data).updatedAtSeconds = getUpdatedAtSeconds(data);

      if (mapFirestoreId) {
        data.id = change.doc.id;
      }

      if (change.type === 'added') {
        acc.added.push(data);
      }

      if (change.type === 'modified') {
        acc.modified.push(data);
      }

      if (change.type === 'removed') {
        acc.removed.push((<any>data)[id]);
      }

      return acc;
    },
    accumulator);
  }

  return accumulator;
}

function addParentID<T>(entities: T[], parentID: string): T[] {
  return entities.map((e: T) => {
    return {
      ...e,
      parentID
    };
  });
}

export function addParentIDToAggregateDocChanges<T>(
  changes: NgPatAggregateFirebaseSnapshotChanges<T>,
  parentID: string
): NgPatAggregateFirebaseSnapshotChanges<T> {
  return {
    added: addParentID(changes.added, parentID),
    modified: addParentID(changes.modified, parentID),
    removed: addParentID(changes.removed, parentID)
  };
}
