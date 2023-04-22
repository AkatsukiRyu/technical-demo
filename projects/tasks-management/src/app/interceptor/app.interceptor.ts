import { HttpErrorResponse, HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';

import { Observable, throwError } from 'rxjs';
import { catchError, finalize } from 'rxjs/operators';
import { ApplicationService } from '../services/app.service';
import { AuthenticationService } from '../services/authentication.service';

@Injectable()
export class InterceptorConfig implements HttpInterceptor {

  constructor(
    private authService: AuthenticationService,
  ) { }

  public intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const appConfig = this.authService.getApplicationConfiguration();

    if (!appConfig) {
        return next.handle(request);
    }

    request = request.clone(
      {
        url: `${appConfig.api}/${request.url}`,
        reportProgress: true,
        headers: new HttpHeaders({
          'Access-Control-Allow-Origin': '*',
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          'Cache-Control': 'no-cache'
        })
      }
    );

    return next.handle(request).pipe(
      catchError((err: HttpResponse<any>) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === 401) {

          }
        }
        return throwError(err);
      }),
      finalize(() => {

      })
    );
  }
}
