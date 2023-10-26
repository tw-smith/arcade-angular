import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const access_token = sessionStorage.getItem('access_token')
    if (access_token) {
      const clonedRequest = request.clone({
        headers: request.headers.set("Authorization", "Bearer " + access_token)
      })
      return next.handle(clonedRequest)
    } else {
          return next.handle(request);
    }
  }
}
