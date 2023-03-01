import {User} from 'firebase/auth';

export const OTLID = 'otlid';

interface Login {
  login: boolean;
  loginStorageState: string | null;
}

export interface UserAndOtlid {
  user: User | null;
  otlid: string | null;
}

export interface AuthError {
  title: string;
  message: string;
}

export const LOGIN_VALUE = {
  SHOW_UI: 'showUi',
  IS_WAITING_FOR_TOKEN_TO_SAVE: 'isWaitingForTokenToSave',
  IS_DONE: 'isDone'
};

export const AUTH_QUERY_PARAMS = {
  OTLID: 'otlid',
  IS_LOGGIN_IN: 'isLoggingIn'
};

export enum LOGIN_SCREEN {
  SHOW_LOGIN = 'showLogin',
  SHOW_CLOSE_BROWSER = 'showCloseBrowser',
  SHOW_ERROR = 'showError',
  SHOW_LOGGING_IN = 'showLogginIn'
}
