import { Component, OnInit } from '@angular/core';
import { BrandsService } from 'src/app/Core/services/brands.service';
import { OwlOptions } from 'ngx-owl-carousel-o';
@Component({
  selector: 'app-brands',
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.css']
})
export class BrandsComponent implements OnInit {
  brands: any[] = [];
  searchterm: string = '';
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

}
