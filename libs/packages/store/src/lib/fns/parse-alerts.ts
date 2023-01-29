import {ERROR_MESSAGES} from './parse-errors';

export const ALERT_MESSAGES: any = {
  accountCreated: 'Account created, log in with your email and password.'
};

export function parseAlert(error: {code: number; message: string}): {
  code: number;
  message: string;
} {
  if (error.message === ERROR_MESSAGES.providerId) {
    return {
      code: 1,
      message: ALERT_MESSAGES.accountCreated
    };
  }

  return {
    code: 0,
    message: ''
  };
}
