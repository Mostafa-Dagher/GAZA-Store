import { AuthService } from 'src/app/Core/services/auth.service';
import { BehaviorSubject } from 'rxjs';
import { CartSService } from 'src/app/Core/services/cart-s.service';
import { Component, OnInit } from '@angular/core';
import { WishlistSService } from 'src/app/Core/services/wishlist-s.service';
import { DatatransferService } from 'src/app/Core/services/datatransfer.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  islogin: boolean = false;
  searchTerm: string = '';

  numOfItem: any = new BehaviorSubject(null);
  numOfItem1: any = new BehaviorSubject(null);
  num: any[] = [];
  constructor(private _AuthService: AuthService
    , private _CartSService: CartSService
    , private _WishlistSService: WishlistSService
    , private _Datatransfer: DatatransferService) {


  }

  ngOnInit(): void {

    this._AuthService.userd.subscribe({
      next: () => {
        if (this._AuthService.userd.getValue() !== null) {
          this.islogin = true;
        }
        else { this.islogin = false; }
      }
    })

    this._CartSService.numOfCartItims.subscribe({
      next: (x) => {
        this.numOfItem = x;


      }
    })

    this._WishlistSService.numOfwishlistItims.subscribe({
      next: (x) => {
        this.numOfItem1 = x;
      }
    })


  }


  logOut() {
    this._AuthService.logOut()
  }

  sendData() {
    this._Datatransfer.sendData(this.searchTerm);
  }
}
