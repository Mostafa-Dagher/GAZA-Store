import { Component, OnInit } from '@angular/core';
import { WishlistSService } from 'src/app/Core/services/wishlist-s.service';


@Component({
  selector: 'app-wishlist',
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.css']
})
export class WishlistComponent implements OnInit {
  constructor(private _WishlistSService: WishlistSService) { }
  arr: any[] = [];
  testallCart: any;
  ngOnInit(): void {
    this.getwh();

  }


  getwh() {
    this._WishlistSService.Get_product_to_wishlist().subscribe({
      next: (res) => {
        this.arr = res.user.wishList;
        this._WishlistSService.numOfwishlistItims.next(res.user.numberOfWishList)
      },
      error: (x) => {
        console.log(x);

      }

    })
  }

  removWishlist(id: string) {
    this._WishlistSService.Remove_product_to_wishlist(id).subscribe({
      next: (x) => {
        console.log(x);
        this.getwh();
      },

      error: (x) => {
        console.log(x);
      }
    })
  }



}
