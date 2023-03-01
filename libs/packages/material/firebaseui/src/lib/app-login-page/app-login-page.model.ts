import { InjectionToken } from '@angular/core';


export interface AppLoginConfig {
  description: string;
}

export const APP_LOGIN_CONFIG = new InjectionToken<AppLoginConfig>('APP_LOGIN_CONFIG')
