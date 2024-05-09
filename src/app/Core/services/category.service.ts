import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  api: string = environment.apiUrl
  constructor(private _HttpClient: HttpClient) { }


  getCategories(size: number): Observable<any> {
    return this._HttpClient.get(this.api + `category?&size=${size}`);
  }

  getSubCategories(size: number ,categoryID:string): Observable<any> {
    return this._HttpClient.get(this.api + `category/${categoryID}/subCategory/subCategoryByCategoryId?&size=${size}`);
  }
}
