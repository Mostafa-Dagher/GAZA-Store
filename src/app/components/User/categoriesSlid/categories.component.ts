
import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Core/services/category.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ProductsService } from 'src/app/Core/services/products.service';
import { CartSService } from 'src/app/Core/services/cart-s.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.css']
})
export class CategoriesComponent implements OnInit {
  subCategoriesID: string = '65eae0e7c2fbc96b2360fafa'
  SubCategoriesArr: any[] = [];
  CategoriesArr: any[] = [];
  products: any[] = [];
  searchterm: any;
  constructor(private _CategoryService: CategoryService
    , private _ProductsService: ProductsService
    , private _CartSService: CartSService
    , private _ToastrService: ToastrService
  ) { }

  ngOnInit(): void {
    this._CategoryService.getCategories(50).subscribe({
      next: (Categories) => {
        this.CategoriesArr = Categories.categories;
      },
      error: (err) => {
        console.log(err);
      }
    })


    this.getProduct();
    this.getsub(this.subCategoriesID);
  }

  getsub(id:string) {
    this._CategoryService.getSubCategories(4,id ).subscribe({
      next: (Categories) => {
        this.SubCategoriesArr = Categories.subCategories;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  getProduct() {
    this._ProductsService.getProductByCaticoryid(this.subCategoriesID, 4).subscribe({
      next: (products) => {
        this.products = products.products;
      },
      error: (err) => {
        console.log(err);
        this.products == null
        this._ToastrService.error(err.error.errMass);
      }
    })
  }

  SubCategoriesID(id: string) {
    this.subCategoriesID = id;
    this.getsub(id);
    this.getProduct();
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
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    autoplayTimeout: 2500,
    responsive: {
      0: {
        items: 1
      }, 1: {
        items: 2
      }, 2: {
        items: 5
      }
    },

  }

}
