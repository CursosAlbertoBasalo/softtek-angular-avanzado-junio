import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpHeaders,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { BehaviorSubject, Observable, pipe, throwError } from 'rxjs';
import { catchError, filter, mergeMap, switchMap, take } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { AuthService } from './services/auth.service';
//import { AuthService } from '../services/auth/auth.service';
//import { AppConfigurationService } from '../services/config-balearia/app.configuration.service';

// @Injectable()
export class AuthStkInterceptor implements HttpInterceptor {
  queuedRequest = [];
  private refreshTokenSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);

  constructor(
    private authService: AuthService,
    private appConfigurationService: AppConfigurationService
  ) {}

  kickOut() {
    this.authService.logout();
  }

  isApiRequest(url: string) {
    return (
      this.appConfigurationService.didFinishLoad() &&
      url.startsWith(this.appConfigurationService.get('apiDomain'))
    );
  }

  isLiferayApiRequest(url: string) {
    return (
      this.appConfigurationService.didFinishLoad() &&
      url.startsWith(this.appConfigurationService.get('liferayApiDomain'))
    );
  }

  isConfigRequest(url: string) {
    return url.startsWith(environment.configFilePath);
  }

  isSkipAuth(url: string) {
    return (
      this.appConfigurationService.didFinishLoad() &&
      url.startsWith(this.appConfigurationService.get('apiDomain')) &&
      (url.endsWith('/api/login') || url.endsWith('/api/login/ADF'))
    );
  }

  isRefreshRequest(url: string) {
    return this.appConfigurationService.didFinishLoad() && url.indexOf('api/login/refresh') !== -1;
  }

  private xPipe = pipe(
    filter((result) => result !== null),
    take(1),
    switchMap((result) => {
      copiedReq = copiedReq.clone({
        headers: copiedReq.headers.set('Authorization', 'Bearer ' + result.access_token),
      });
      return next.handle(copiedReq);
    })
  );

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.isRefreshRequest(req.url)) {
      this.refreshTokenSubject.next(null);
      return next.handle(req).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.kickOut();
          }
          return throwError(err);
        })
      );
    } else if (this.isConfigRequest(req.url) || this.isSkipAuth(req.url)) {
      return next.handle(req);
    } else if (this.isApiRequest(req.url)) {
      const headers: HttpHeaders = req.headers;
      let copiedReq = req.clone();
      if (this.authService.hasToRefresh()) {
        if (this.authService.requestRefreshTokenInProcess) {
          return this.refreshTokenSubject.pipe(
            filter((result) => result !== null),
            take(1),
            switchMap((result) => {
              copiedReq = copiedReq.clone({
                headers: copiedReq.headers.set('Authorization', 'Bearer ' + result.access_token),
              });
              return next.handle(copiedReq);
            })
          );
        } else {
          return this.authService.refreshTokens().pipe(
            mergeMap((data) => {
              this.refreshTokenSubject.next(data);

              copiedReq = copiedReq.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + data.access_token),
              });

              return next.handle(copiedReq).pipe(
                catchError((err: HttpErrorResponse) => {
                  if (err.status === 401) {
                    this.kickOut();
                  }
                  return throwError(err);
                })
              );
            }),
            catchError((e) => {
              //this.kickOut();
              return throwError(e);
            })
          );
        }
      }

      if (this.authService.authData) {
        copiedReq = copiedReq.clone({
          headers: copiedReq.headers.set(
            'Authorization',
            'Bearer ' + this.authService.authData.accessToken
          ),
        });
      }

      if (!this.authService.requestRefreshTokenInProcess) {
        return next.handle(copiedReq).pipe(
          catchError((err: HttpErrorResponse) => {
            if (err.status === 401) {
              this.kickOut();
            }
            return throwError(err);
          })
        );
      }
    } else if (this.isLiferayApiRequest(req.url)) {
      const headers: HttpHeaders = req.headers;
      let copiedReq = req.clone();

      // todo: meter en constantes
      copiedReq = copiedReq.clone({
        headers: copiedReq.headers.set(
          'Authorization',
          'Basic ' + this.appConfigurationService.get('liferayBasicAuth')
        ),
      });

      return next.handle(copiedReq).pipe(
        catchError((err: HttpErrorResponse) => {
          if (err.status === 401) {
            this.kickOut();
          }
          return throwError(err);
        })
      );
    } else {
      return next.handle(req);
    }
  }
}
