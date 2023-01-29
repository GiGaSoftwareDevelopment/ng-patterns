import {ErrorModel} from '../models/error.model';

export const ERROR_MESSAGES: any = {
  createUserWithEmailAndPassword:
    'createUserWithEmailAndPassword failed: First argument "email" must be a valid string.',
  providerId: 'Cannot read property providerId of null'
};

export function parseErrorMessage(message: string): string {
  if (message === ERROR_MESSAGES.createUserWithEmailAndPassword) {
    return 'Invalid email.';
  } else {
    return message;
  }
}

export function parseError(error: ErrorModel): ErrorModel {
  return {
    code: error.code,
    message: parseErrorMessage(<string>error.message)
  };
}
