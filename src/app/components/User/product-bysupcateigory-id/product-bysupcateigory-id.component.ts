import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartSService } from 'src/app/Core/services/cart-s.service';
import { ProductsService } from 'src/app/Core/services/products.service';
import { ToastrService } from 'ngx-toastr';
import { WishlistSService } from 'src/app/Core/services/wishlist-s.service';

@Component({
  selector: 'app-product-bysupcateigory-id',
  templateUrl: './product-bysupcateigory-id.component.html',
  styleUrls: ['./product-bysupcateigory-id.component.css']
})
export class ProductBYSupcateigoryIDComponent implements OnInit {
  productsBYBSupcategoryID: any;
  products: any[]=[]
  searchterm: string = ''
  hart: boolean = false
  constructor(private _ProductsService: ProductsService
    , private _ActivatedRoute: ActivatedRoute
    , private _CartSService: CartSService
    , private _ToastrService: ToastrService
    , private _WishlistSService: WishlistSService
  ) { }
  ngOnInit(): void {

    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productsBYBSupcategoryID = params.get('id');
      }
    });

    this._ProductsService.getProductBySubCaticoryid(this.productsBYBSupcategoryID, 50).subscribe({
      next: (respons) => {
        this.products = respons.products;
      }, error: (err) => {
        this._ToastrService.error(err.error.errMass)
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
    this.hart = !this.hart;
    this._WishlistSService.Add_product_to_wishlist(_id).subscribe({
      next: (respons) => {
        console.log(respons);
        this._WishlistSService.numOfwishlistItims.next(respons.numberOfWishList)

        this.showSuccess('Wishlist');
      },
      error: (err) => { console.log(err) }
    })
  }


  showSuccess(x: string) {
    this._ToastrService.success(`Product was add in your ${x}`);
  }

}
