import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  formLogin: FormGroup = this.fb.group({
    correo: ['test1@test.cl', [ Validators.required, Validators.email ] ],
    contrasena: ['123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(  private fb: FormBuilder,
                private router: Router ) { }

  login(): void {
    console.log(this.formLogin.valid);
    console.log(this.formLogin.value);

    this.router.navigateByUrl('/dashboard');
  }


}
