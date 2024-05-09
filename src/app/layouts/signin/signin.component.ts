import { Component } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/Core/services/auth.service';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  constructor(private _AuthService: AuthService, private _router: Router) {

    if (localStorage.getItem('userToken') !== null) {
      _router.navigate(['/home'])
    }
  }

  islooding: boolean = false;
  msg: string = '';

  loginForm: FormGroup = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required, Validators.pattern(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/)]),

  });
  handelelogin(loginForm: FormGroup) {
    this.islooding = true;

    if (loginForm.valid) {
      // console.log('true');
      this._AuthService.login(loginForm.value).subscribe({

        next: (resposne) => {
          console.log(resposne);

          if (resposne.message == 'Done') {
            localStorage.setItem('userRoul', resposne.role);
            localStorage.setItem('userToken', resposne.refresh_token);
            this._AuthService.decodeUserData();
            this.islooding = false;
            this._router.navigate(['/home'])
          }
        },

        error: (err) => {
          console.log(err);
          this.islooding = false;

          this.msg = err.error.errMass;

          // this._router.navigate(['/signup'])
        }




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
