import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class TestService {

  constructor(private _HttpClient: HttpClient) { }

  getProductTest(): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/products`);
  }
  getCartsTest(): Observable<any> {
    return this._HttpClient.get(`https://dummyjson.com/carts/1`);
  }

}
