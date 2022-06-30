import { Injectable } from '@angular/core';
import { LoggerBaseService } from './logger-base.service';

@Injectable()
export class LoggerService extends LoggerBaseService {
  constructor() {
    super();
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
