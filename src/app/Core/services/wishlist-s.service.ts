import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class WishlistSService {
  numOfwishlistItims = new BehaviorSubject(0);
  numOfwishlistItims1 = new BehaviorSubject(0);
  api = environment.apiUrl

  constructor(private _HttpClient: HttpClient) {
    this.Get_product_to_wishlist().subscribe({
      next: (x) => {
        this.numOfwishlistItims.next(x.user.numberOfWishList)
        this.numOfwishlistItims1.next(x.user.wishList)
      },
      error: (err) => console.log(err)
    })
  }



  Get_product_to_wishlist(): Observable<any> {
    return this._HttpClient.get(this.api + `user/profile`);
  }


  Add_product_to_wishlist(productId: string): Observable<any> {
    return this._HttpClient.patch(this.api + `product/${productId}/wishlist/add`, {});
  }


  Remove_product_to_wishlist(productId: string): Observable<any> {
    return this._HttpClient.patch(this.api + `product/${productId}/wishlist/remove`, {});
  }



}
