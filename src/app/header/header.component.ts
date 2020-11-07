import { Component, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { LoginService } from '../login.service';
import { throwError } from 'rxjs';
import { AuthService } from 'angularx-social-login';

export interface LoginData {
  userName: string;
  password: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private router: Router,
              public dialog: MatDialog, private loginService: LoginService, private authService: AuthService) { }
   loggedInUser: string;
   loggedIn = false;
   isSocialUser = false;
  ngOnInit() {
    this.loginService.loginSucessful.subscribe(loginDetails => {
      if (loginDetails && loginDetails.loginStatus) {
        this.loggedIn = true;
        this.loggedInUser = loginDetails.userName;
      }
    });
  }


  onLogout() {
    this.loggedIn = false;
    this.loggedInUser = null;
    this.loginService.loginSucessful.next(null);
    this.authService.signOut();
    location.reload();
  }
}
