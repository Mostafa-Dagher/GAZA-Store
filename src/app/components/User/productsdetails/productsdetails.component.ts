import { Component, OnInit } from '@angular/core';
import { ProductsService } from 'src/app/Core/services/products.service';
import { ActivatedRoute } from '@angular/router';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { CartSService } from 'src/app/Core/services/cart-s.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-productsdetails',
  templateUrl: './productsdetails.component.html',
  styleUrls: ['./productsdetails.component.css']
})
export class ProductsdetailsComponent implements OnInit {
  responsData: any;
  productId: any;
  constructor(
    private _ProductsService: ProductsService
    , private _ActivatedRoute: ActivatedRoute
    , private _CartSService: CartSService
    , private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.productId = params.get('id');
      }
    });

    this._ProductsService.getProductDetails(this.productId).subscribe({
      next: (respons) => {
        this.responsData = respons.product;
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
  showSuccess(x: string) {
    this._ToastrService.success(`Product was add in your ${x}`);
  }


  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 1
      },
    },
  }

}
