import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptorInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    const id_token = localStorage.getItem('id_token');
    console.log(id_token, '1111111111');
    if(!id_token){
      console.log('22222222');
        return next.handle(request);
    }else{
      const cloned = request.clone({
        headers: request.headers.set('Authorization', "Bearer " + id_token)
      });
      console.log(cloned, '33333333');
      return next.handle(cloned);
    }
  }
}
