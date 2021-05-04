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

                      this._usuario = {
                        nombre: resp.nombre!,
                        uid: resp.uid!,

                      }
                    }
                  } ),
                  map( resp =>  resp.ok ),
                  catchError( err => of(err.error.msg) )
                );

  }


  validarToken(): Observable<AuthResponse> {
    const url = `${this.baseUrl}/auth/renovar`;
    const headers = new HttpHeaders()
        .set('g-token', localStorage.getItem('token') || '' );

    return this.http.get<AuthResponse>( url, { headers } );

  }

}
