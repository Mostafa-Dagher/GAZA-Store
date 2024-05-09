import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class AddhaderInterceptor implements HttpInterceptor {

  constructor() { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {

    let token: any = localStorage.getItem('userToken')
    let modifidReq = request.clone({
      headers: request.headers.set('authorization', 'Hamada__' + token)
      //authorization ===============^^
    })
    return next.handle(modifidReq);
  }
}
