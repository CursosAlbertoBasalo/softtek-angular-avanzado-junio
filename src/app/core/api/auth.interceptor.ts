import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SessionFacade } from '../session.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private sessionSrv: SessionFacade) {}

  public intercept(
    request: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    const access_token = this.sessionSrv.getAccessToken();

    const clonedRequest = request.clone({
      setHeaders: {
        Authorization: `Bearer ${access_token}`,
      },
    });

    return next.handle(clonedRequest);
  }
}
