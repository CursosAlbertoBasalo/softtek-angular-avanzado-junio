import { Inject, Injectable, InjectionToken } from '@angular/core';

export const ONLY_ERRORS = new InjectionToken<boolean>('onlyErrors');
export const APP_VERSION = new InjectionToken<string>('appVersion');

@Injectable()
export class LoggerService {
  // private onlyErrors = false;
  // private appVersion = '1.0.0';

  constructor(
    @Inject(ONLY_ERRORS) private onlyErrors: boolean,
    @Inject(APP_VERSION) private appVersion: string
  ) {
    //super();
  }

  public log(message: string) {
    if (this.onlyErrors) return;
    console.log(`ℹ️ ${this.appVersion} - ${message}`);
  }

  public warn(message: string) {
    if (this.onlyErrors) return;
    console.warn(`⚠️ ${this.appVersion} - ${message}`);
  }

  public error(message: string, error: Error) {
    const logMessage = `💣 ${this.appVersion} - ${message} - ERR: ${error.message}`;
    console.warn(logMessage);
  }
}
