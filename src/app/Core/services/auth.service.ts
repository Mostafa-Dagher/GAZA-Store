import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import jwtDecode from 'jwt-decode';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userd = new BehaviorSubject(null);
  api: string = environment.apiUrl
  constructor(private _HttpClient: HttpClient, private _router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      this.decodeUserData();
    }
  }

  decodeUserData() {
    let encoded = JSON.stringify(localStorage.getItem('userToken'))
    let decodedToken: any = jwtDecode(encoded);
    this.userd.next(decodedToken)
  }

  register(userData: object): Observable<any> {
    return this._HttpClient.post(this.api + `auth/signup`, userData)
  }

  login(userData: object): Observable<any> {
    return this._HttpClient.post(this.api + `auth/signin`, userData)
  }


  logOut() {
    localStorage.removeItem('userToken');
    this.userd.next(null);
    this._router.navigate(['/signin'])
  }
}
