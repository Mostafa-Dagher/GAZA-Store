import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Core/services/brands.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-brand-slied',
  templateUrl: './brand-slied.component.html',
  styleUrls: ['./brand-slied.component.css']
})
export class BrandSliedComponent implements OnInit {
  brands: any[] = [];
  constructor(private _BrandsService: BrandsService) { }

  ngOnInit(): void {
    this._BrandsService.getAllBrands(50).subscribe({
      next: (respons) => {
        if (respons.message == 'Done') {
          this.brands = respons.brands;
        }
        else {
          console.log("Error in respons => Brand.ts ");
        }
      },
      error: (res) => {
        console.log(res.message);
      }
    })
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
        items: 1
      }, 1: {
        items: 2
      }, 2: {
        items: 5
      }
    },

  }

}
