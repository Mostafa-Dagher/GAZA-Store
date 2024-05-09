import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class BrandsService {

  api: string = environment.apiUrl
  constructor(private _HttpClient: HttpClient) { }

  getAllBrands(size: number): Observable<any> {
    return this._HttpClient.get(this.api + `brand?size=${size}`);
  }

  getProductByBrandid(BrandId: string, size: number): Observable<any> {
    return this._HttpClient.get(this.api + `brand/${BrandId}/product/productsOfSpecificBrand?size=${size}`);
  }
  
}
