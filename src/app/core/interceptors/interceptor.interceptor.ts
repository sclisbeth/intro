import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpHeaders,
  HttpErrorResponse
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable()
export class InterceptorInterceptor implements HttpInterceptor {

  constructor(private router: Router) { }


  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('intercept');

    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMzQ1Njc4OTAifQ._aG0ukzancZqhL1wvBTJh8G8d3Det5n0WKcPo5C0DCY';
    const api = 'users';
    console.log(request.url);
    if (request.url?.includes(api)) {

      const authReq = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(authReq).pipe(
        catchError((error: HttpErrorResponse) => {
          let errorMsg = '';

          if (error.error instanceof ErrorEvent) {
            errorMsg = `Error de red: ${error.error.message}`;
          } else {
            errorMsg = `Error ${error.status}: ${error.message}`;
          }

          console.error('ERROR INTERCEPTADO:', errorMsg);

          if (error.status === 401) {
            this.router.navigate(['/e1']);

          }

          return throwError(() => error);
        })
      );

    }

    return next.handle(request);
  }
}
