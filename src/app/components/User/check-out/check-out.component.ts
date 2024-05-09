import { ToastrService } from 'ngx-toastr';
import { Component, OnInit } from '@angular/core';
import { CartSService } from 'src/app/Core/services/cart-s.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AllordersSService } from 'src/app/Core/services/allorders-s.service';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.css']
})

export class CheckOutComponent implements OnInit {
  card_id: any = "";


  constructor(
    private _CartSService: CartSService
    , private _ActivatedRoute: ActivatedRoute
    , private _ToastrService: ToastrService
    , private _AllordersSService: AllordersSService
    , private _Router: Router) { }

  shippingAddress: FormGroup = new FormGroup({

    paymentMethod: new FormControl(null, [Validators.required]),
    address: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  })

  ngOnInit(): void {
    this._ActivatedRoute.paramMap.subscribe({
      next: (params) => {
        this.card_id = params.get('id');
      }
    });
  }

  handelSubmit(shippingAddress: FormGroup) {
    this._AllordersSService.onlinPayment(shippingAddress.value).subscribe({
      next: (x) => { 
        if (x.url) {
          window.location.href = x.url
        }
        else if (x.message == "Done") {
          this._Router.navigate(['/allorders'])
        }
      },
      error: (err) => { this._ToastrService.error(err.error.errMass) },
    })
  }


}
