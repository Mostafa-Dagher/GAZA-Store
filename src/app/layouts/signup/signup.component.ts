import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent {
  constructor(private _AuthService: AuthService, private _router: Router) {
    if (localStorage.getItem('userToken') !== null) {
      _router.navigate(['/home'])
    }
  }

  islooding: boolean = false;
  message: string = '';

  registerForm: FormGroup = new FormGroup({
    userName: new FormControl(null, [Validators.required, Validators.minLength(3), Validators.maxLength(15)]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    cPassword: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),
    phone: new FormControl(null, [Validators.required, Validators.pattern(/^01[0125][0-9]{8}$/)]),

  });



  handelRegister(registerForm: FormGroup) {
    this.islooding = true;

    if (registerForm.valid) {
      this._AuthService.register(registerForm.value).subscribe({
        next: (resposne) => {
          console.log(resposne);
          this.islooding = false;
          this._router.navigate(['/signin'])

        },

        error: (err) => {
          console.log(err.message);
          return this.message = err.error.errors.msg;
        },


      })

    }
  }

  visibele: boolean = true;
  changetype: boolean = true;

  viewpass() {
    this.visibele = !this.visibele;
    this.changetype = !this.changetype
  }



}
