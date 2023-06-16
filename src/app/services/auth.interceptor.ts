import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {catchError, Observable, throwError} from 'rxjs';
import {AuthService} from "./auth.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private authService: AuthService) {
  }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    if (window.sessionStorage.getItem('accessToken') === null || window.sessionStorage.getItem('accessToken') === undefined) {
      let formData = new FormData();
      formData.append('username', '09777903909');
      formData.append('password', 'Efficient@soft#1982');
      this.authService.post(formData).subscribe((res) => {
        console.log(res);
        window.sessionStorage.setItem('accessToken', res.data.access_token);
        window.sessionStorage.setItem('userId', res.data.user.id);
      });
    }

    request = request.clone({
      setHeaders: {
        Authorization: `Bearer ${window.sessionStorage.getItem('accessToken')}`,
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
