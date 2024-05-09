import { Component, OnInit } from '@angular/core';
import { AllordersSService } from 'src/app/Core/services/allorders-s.service';


@Component({
  selector: 'app-allorder',
  templateUrl: './allorder.component.html',
  styleUrls: ['./allorder.component.css']
})
export class AllorderComponent implements OnInit {
  allOrder: any[] = []
  constructor(private _AllordersSService: AllordersSService) { }

  ngOnInit(): void {
    this._AllordersSService.getOrders().subscribe({
      next: (respons) => {
        
        this.allOrder = respons.orders;
      }
    })
  }
}
