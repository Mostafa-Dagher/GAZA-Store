import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/Core/services/category.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-sub-catgcory',
  templateUrl: './sub-catgcory.component.html',
  styleUrls: ['./sub-catgcory.component.css']
})
export class SubCatgcoryComponent {

  CategoriesArr: any[] = [];
  subId: any;
  SubCategoriesArr: any[] = [];
  // subCategoriesID: string = '65eae0e7c2fbc96b2360fafa';
  constructor(private _ProductsService: CategoryService, private _ActivatedRoute: ActivatedRoute) {}

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.subId = params.get('id');
      }
    });
    this._ProductsService.getCategories(50).subscribe({
      next: (Categories) => {
        this.CategoriesArr = Categories.categories;
      },
      error: (err) => {
        console.log(err);

      }
    })

    this.getsub();

  }

  getsub() {
    this._ProductsService.getSubCategories(50, this.subId).subscribe({
      next: (Categories) => {
        this.SubCategoriesArr = Categories.subCategories;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

  SubCategoriesID(id: string) {
    this.subId = id;
    this.getsub();
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: false,
    autoplay: true,
    navSpeed: 700,
    navText: ['', ''],
    responsive: {
      0: {
        items: 5
      },
    },
  }
}
