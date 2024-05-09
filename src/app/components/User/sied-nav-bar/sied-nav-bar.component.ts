import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Core/services/brands.service';
import { CategoryService } from 'src/app/Core/services/category.service';

@Component({
  selector: 'app-sied-nav-bar',
  templateUrl: './sied-nav-bar.component.html',
  styleUrls: ['./sied-nav-bar.component.css']
})

export class SiedNavBarComponent implements OnInit {
  isActive: boolean = false;
  iscategoryDrwop: boolean = true;
  isSubDrwop: boolean = true;
  isDrowpBrand: boolean = true
  category: any;
  subCategory: any;
  brands: any;
  subCategoryID: string = "65eae118c2fbc96b2360faff";
  constructor(private _CategoryService: CategoryService, private _BrandsService: BrandsService) { }

  ngOnInit(): void {
    
    this._BrandsService.getAllBrands(4).subscribe({
      next: (respons) => {
        this.brands = respons.brands;
        // console.log('brand =>', this.brands);
      },
      error: (res) => {
        console.log(res.message);
      }
    })

    this._CategoryService.getCategories(4).subscribe({
      next: (respons) => {
        this.category = respons.categories;
        
      }
    })
    this.sendData(this.subCategoryID);
  }

  sendData(subCategoryID: string) {
    this._CategoryService.getSubCategories(50, subCategoryID).subscribe({
      next: (Categories) => {
        this.subCategory = Categories.subCategories;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }




  

  toggleSidebar() {
    this.isActive = !this.isActive;
  }
  DrowpBrand() {
    this.isDrowpBrand = !this.isDrowpBrand;
  }
  DrowpCatecory() {
    this.iscategoryDrwop = !this.iscategoryDrwop;

  }
  DrowpSupCatecory() {
    this.isSubDrwop = !this.isSubDrwop;
    this.iscategoryDrwop = true;
  }



}


