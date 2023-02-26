import { createDefaultFirebaseConfig } from '@ngpat/firebase';
import { firebaseConfig } from '@ngpat/patterns/secrets';

export const environment = {
  production: true,
  firebaseConfig: createDefaultFirebaseConfig(firebaseConfig)
};
