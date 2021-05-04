import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent {


  public get usuario() {
    return this.authService.usuario;
  }


  constructor( private router: Router,
              private authService: AuthService ) { }

  logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('/auth');

  }

}
