import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/servicios/autentificacion/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls:  ['../../shared/login-styles.scss']

  
})
export class LoginComponent implements OnInit {
  constructor(private router: Router, public authService: AuthService) {}

  ngOnInit(): void {}

  // loginWithGoogle() {
  //   this.authService.GoogleAuth().catch((e) => console.log(e.message));
  // }
}
