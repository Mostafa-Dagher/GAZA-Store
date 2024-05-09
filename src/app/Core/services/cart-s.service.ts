import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CartSService {
  numOfCartItims = new BehaviorSubject(0);
  api = environment.apiUrl;

  constructor(private _HttpClient: HttpClient) {
    this.getLogUserCart().subscribe({
      next: (x) => {
        this.numOfCartItims.next(x.cart.numberOfProducts)
      },
      error: (err) => console.log(err)
    })
  }

  getLogUserCart(): Observable<any> {
    return this._HttpClient.get(this.api + 'cart')
  }



  AddToCart(productId: string, quantity: number): Observable<any> {
    return this._HttpClient.post(this.api + 'cart', {
      "productId": productId,
      "quantity": quantity
    });
  }

  UpdateUserCount(id: string, count: number): Observable<any> {
    return this._HttpClient.post(this.api + 'cart', {
      "productId": id,
      "quantity": count
    });
  }

  removeLogUserCart(ProductId: string, CartId: string): Observable<any> {
    return this._HttpClient.patch(this.api + `product/${ProductId}/cart/${CartId}`, {})

  }


 
}
