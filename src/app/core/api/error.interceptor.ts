import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(private logger: LoggerService, private router: Router) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    // ToDo: security interceptor
    // request.headers.append('Authorization', 'Bearer ');
    return next.handle(request).pipe(catchError((error) => this.processError(error)));
  }

  private processError(error: any): Observable<any> {
    this.logger.error('Intercepted error', error);
    if (error instanceof HttpErrorResponse) {
      const statusCode = error.status;
      if (statusCode === 401) {
        this.router.navigate(['login']);
      }
      if (statusCode >= 500) {
        // ToDo: send action to status store
        this.logger.error('Server error', error);
      }
    } else {
      this.logger.error('😨 App Error', error);
    }
    return throwError(() => error);
  }
}

// export const HTTP_INTERCEPTORS2 = new InjectionToken<HttpInterceptor>('HTTP_INTERCEPTORS2');

// @Injectable()
// export class HttpClient2 {
//   constructor(@Inject(HTTP_INTERCEPTORS2) private interceptors: HttpInterceptor[]) {}

//   public get() {
//     let request: HttpRequest<unknown>;
//     let next: HttpHandler;
//     this.interceptors.forEach((interceptor) => interceptor.intercept(request, next));
//   }
// }
// @Injectable()
// export class CuentasAPI {
//   constructor(private http: HttpClient2) {}
// }
