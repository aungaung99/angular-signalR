import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${window.sessionStorage.getItem('access_token')}`,
      },
    });

    return next.handle(request).pipe(
      catchError((err) => {
        if (err.status === 401) {
          console.log(err);
        }
        const error = err.error.message || err.statusText;
        return throwError(error);
      })
    );
  }
}
