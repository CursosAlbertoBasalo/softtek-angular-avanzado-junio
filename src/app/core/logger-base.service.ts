import { Injectable } from '@angular/core';

@Injectable()
export abstract class LoggerBaseService {
  protected onlyErrors = false;
  protected appVersion = '1.0.0';

  constructor() {}

  abstract log(message: string): void;

  abstract warn(message: string): void;

  abstract error(message: string, error: Error): void;
}
