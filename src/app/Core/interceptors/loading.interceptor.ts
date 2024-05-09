// http-loading.interceptor.ts
import { Injectable } from '@angular/core';
import {
  HttpInterceptor,
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { NgxSpinnerService } from 'ngx-spinner';
@Injectable()
export class loadinginterceptor implements HttpInterceptor {
  constructor(private _NgxSpinnerService: NgxSpinnerService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    this._NgxSpinnerService.show()
    return next.handle(request).pipe(finalize(() => {
      this._NgxSpinnerService.hide()
    }));
  }
}