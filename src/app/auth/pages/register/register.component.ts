import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister: FormGroup = this.fb.group({
    nombre: ['test1', [ Validators.required, Validators.minLength(3) ] ],
    correo: ['test1@test.com', [ Validators.required, Validators.email ] ],
    contrasena: ['123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor(  private fb: FormBuilder,
                private router: Router,
                private authService: AuthService ) { }

  register(): void {

    const { nombre, correo, contrasena } = this.formRegister.value;

    this.authService.registro(nombre, correo, contrasena)
          .subscribe( ok => {

            console.log(ok);


            if ( ok === true ) {
              this.router.navigateByUrl('/dashboard');
            } else {

              Swal.fire('Error', ok, 'error');

            }

          });
  }

}
