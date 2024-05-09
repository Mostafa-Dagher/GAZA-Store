import { CartSService } from 'src/app/Core/services/cart-s.service';
import { ProductsService } from 'src/app/Core/services/products.service';
import { WishlistSService } from 'src/app/Core/services/wishlist-s.service';
import { DatatransferService } from 'src/app/Core/services/datatransfer.service';
import { ToastrService } from 'ngx-toastr';

import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})

export class ProductsComponent implements OnInit {
  Allproducts: any[] = []
  test: any;
  //  hart: Boolean = false
  searchterm: string = '';
  wishlist: any
  arr: any[] = []

  constructor(
    private _DatatransferService: DatatransferService
    , private _ProductsService: ProductsService
    , private _CartSService: CartSService
    , private _WishlistSService: WishlistSService
    , private _ToastrService: ToastrService

  ) { }

  ngOnInit(): void {
    this._DatatransferService.data$.subscribe(data => {
      this.searchterm = data;
    });

    this._ProductsService.getProducts(`?size=50`).subscribe({
      next: (productsData) => {
        if (productsData.message == "Done")
          this.Allproducts = productsData.products;
        // console.log(productsData.products);
      }
    })

    this._WishlistSService.Get_product_to_wishlist().subscribe({
      next: (response) => {
        console.log(response.user.wishList);
        this.wishlist = response.user.wishList
        for (let i = 0; i < this.wishlist.length; i++) {
          this.arr.push(this.wishlist[i]._id);
        }

        console.log(this.arr)
      }
    })
  }

  getCart(productId: string) {
    this._CartSService.AddToCart(productId, 1).subscribe({
      next: (respons) => {
        this._CartSService.numOfCartItims.next(respons.numberOfProducts)


        this.showSuccess('Cart');
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  addToWishlist(_id: string) {
    // this.hart = !this.hart;
    this._WishlistSService.Add_product_to_wishlist(_id).subscribe({
      next: (respons) => {
        console.log(respons);
        this._WishlistSService.numOfwishlistItims.next(respons.numberOfWishList)
        this._WishlistSService.numOfwishlistItims1.next(respons)


        this.showSuccess('Wishlist');
        
      },
      error: (err) => { console.log(err) }
    })
  }


  showSuccess(x: string) {
    this._ToastrService.success(`Product was add in your ${x}`);
  }

}
