import { CartSService } from 'src/app/Core/services/cart-s.service';
import { ProductsService } from 'src/app/Core/services/products.service';
import { WishlistSService } from 'src/app/Core/services/wishlist-s.service';
import { DatatransferService } from 'src/app/Core/services/datatransfer.service';
import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-top-selling',
  templateUrl: './top-selling.component.html',
  styleUrls: ['./top-selling.component.css']
})
export class TopSellingComponent implements OnInit {
  Allproducts: any[] = []
  hart: Boolean = false
  searchterm: string = '';

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
    
    this._ProductsService.getProducts(`?size=4&page=1&sort=-discound`).subscribe({
      next: (productsData) => {
        if (productsData.message == "Done")
          this.Allproducts = productsData.products;
        // console.log(productsData.products);
      }
    })
  }

  getCart(productId: string) {
    this._CartSService.AddToCart(productId,1).subscribe({
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
    this.hart = !this.hart;
    console.log(_id);
    this._WishlistSService.Add_product_to_wishlist(_id).subscribe({
      next: (respons) => {
        this._WishlistSService.numOfwishlistItims.next(respons.numberOfWishList)
        this.showSuccess('Wishlist');
      },
      error: (z) => {
        console.log(z);
      }
    })
  }
  showSuccess(x: string) {
    this._ToastrService.success(`Product was add in your ${x}`);
  }


}
