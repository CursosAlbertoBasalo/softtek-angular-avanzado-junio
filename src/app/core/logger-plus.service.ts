import { Injectable } from '@angular/core';
import { LoggerBaseService } from './logger-base.service';

@Injectable()
export class LoggerPlusService extends LoggerBaseService {
  constructor() {
    super();
  }

  public log(message: string) {
    if (this.onlyErrors) return;
    console.log(`${new Date()}: ${this.appVersion} - ${message}`);
  }

  public warn(message: string) {
    if (this.onlyErrors) return;
    console.warn(`${new Date()}: ${this.appVersion} - ${message}`);
  }

  public error(message: string, error: Error) {
    const logMessage = `${new Date()}: ${this.appVersion} - ${message} - ERR: ${error.message}`;
    console.warn(logMessage);
  }
}
