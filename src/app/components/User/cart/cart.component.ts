import { Component, OnInit } from '@angular/core';
import { CartSService } from 'src/app/Core/services/cart-s.service';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {
  allCart: any;
  testallCart: any;
  Cartid: string = ''
  constructor(private _CartSService: CartSService) { }

  ngOnInit(): void {
    this.getCArt();
  }

  
  getCArt() {
    this._CartSService.getLogUserCart().subscribe({
      next: (respons) => {
        this._CartSService.numOfCartItims.next(respons.cart.numberOfProducts);
        this.allCart = respons.cart.products;
        this.Cartid = respons.cart._id
      },
      error: (err) => console.log(err)
    })
  }


  UpdateCart(id: string, count: number) {
    this._CartSService.UpdateUserCount(id, count).subscribe({
      next: (respons) => {
        this._CartSService.numOfCartItims.next(respons.numberOfProducts);
        this.getCArt();
      },
      error: (err) => console.log(err)
    })
  }


  removCategory(productid: string) {
    this._CartSService.removeLogUserCart(productid, this.Cartid).subscribe({
      next: (respons) => {
        this._CartSService.numOfCartItims.next(respons.numberOfProducts);
        this.getCArt();
      },
      error: (err) => console.log(err),
    })
  }
}
