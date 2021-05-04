import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {

  formRegister: FormGroup = this.fb.group({
    nombre: ['test1', [ Validators.required, Validators.minLength(3) ] ],
    correo: ['test1@test.cl', [ Validators.required, Validators.email ] ],
    contrasena: ['123456', [ Validators.required, Validators.minLength(6) ] ],
  });

  constructor( private fb: FormBuilder) { }

  register(): void {
    console.log(this.formRegister.valid);
    console.log(this.formRegister.value);
  }

}
