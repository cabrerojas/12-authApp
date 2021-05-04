import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent  {

  formLogin: FormGroup = this.fb.group({
    correo: ['test1@test.com', [ Validators.required, Validators.email ] ],
    contrasena: ['123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(  private fb: FormBuilder,
                private router: Router,
                private authService: AuthService  ) { }

  login(): void {

    const { correo, contrasena } = this.formLogin.value;

    this.authService.login(correo, contrasena)
            .subscribe( resp => {
              console.log(resp);
            });

    // this.router.navigateByUrl('/dashboard');
  }


}
