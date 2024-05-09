import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  api: string = environment.apiUrl
  constructor(private _HttpClient: HttpClient) { }

  getProducts(QueryParams: string): Observable<any> {
    return this._HttpClient.get(this.api + `product${QueryParams}`);
  }
  getProductDetails(_id: string): Observable<any> {
    return this._HttpClient.get(this.api + `product/${_id}`);
  }

  getProductByCaticoryid(_id: string, size: number): Observable<any> {
    return this._HttpClient.get(this.api + `category/${_id}/product/productsOfSpecificCategory?size=${size}`);
  }

  getProductBySubCaticoryid(_id: string, size: number): Observable<any> {
    return this._HttpClient.get(this.api + `subcategory/${_id}/product/productsOfSpecificSubcategory?size=${size}`);
  }



}
