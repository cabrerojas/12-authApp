import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { AuthResponse, Usuario } from '../interfaces/interfaces';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private baseUrl = environment.baseUrl;
  private _usuario!: Usuario;


  public get usuario(): Usuario {
    return { ...this._usuario };
  }


  constructor(private http: HttpClient) { }

  registro(nombre: string, correo: string, contrasena: string) {

    const url = `${this.baseUrl}/auth/nuevo` ;

    const body = {
      nombre,
      correo,
      contraseña: contrasena
    };

    return this.http.post<AuthResponse>( url, body )
                .pipe(
                  tap( ({ok, token}) => {
                    if ( ok ){
                      localStorage.setItem('token', token! );
                    }
                  } ),
                  map( resp =>  resp.ok ),
                  catchError( err => of(err.error.msg) )
                );
  }


  login( correo: string, password: string ) {

    const url = `${this.baseUrl}/auth` ;

    const body = {
      correo,
      contraseña: password
    };

    return this.http.post<AuthResponse>( url, body )
                .pipe(
                  tap( resp => {
                    if (resp.ok){

                      localStorage.setItem('token', resp.token! );

                    }
                  } ),
                  map( resp =>  resp.ok ),
                  catchError( err => of(err.error.msg) )
                );

  }


  validarToken(): Observable<boolean> {
    const url = `${this.baseUrl}/auth/renovar`;
    const headers = new HttpHeaders()
        .set('g-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers } )
              .pipe(
                  map( resp => {

                    localStorage.setItem('token', resp.token! );

                    this._usuario = {
                      nombre: resp.nombre!,
                      uid: resp.uid!,
                      correo: resp.correo!,

                    };

                    return resp.ok;
                  }),
                  catchError( err => of(false) )
              );

  }

  logout(): void {


    localStorage.clear();

  }

}
