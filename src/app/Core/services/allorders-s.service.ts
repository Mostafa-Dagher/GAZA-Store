import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class AllordersSService {
  api = environment.apiUrl;

  constructor(private _HttpClient: HttpClient) { }

  onlinPayment(shippingAddress: object): Observable<any> {
    return this._HttpClient.post(this.api + `order`, shippingAddress)
  }

  getOrders(): Observable<any> {
    return this._HttpClient.get(this.api + `order`);
  }
  
}
