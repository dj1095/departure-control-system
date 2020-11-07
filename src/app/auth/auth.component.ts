import { Component, OnInit, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { LoginService } from '../login.service';
import { Router } from '@angular/router';

import { AuthService, SocialUser, FacebookLoginProvider, GoogleLoginProvider } from 'angularx-social-login';
import { AppUtilService } from '../app-util.service';


@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {
  hide = true;
  signInErr = false;
  signInForm: FormGroup;
  user: SocialUser;
  loggedIn: boolean;
  socialSignInError: string;
  constructor(private http: HttpClient,
              private loginService: LoginService,
              private router: Router,
              private authService: AuthService,
              private appUtilService: AppUtilService) { }

  ngOnInit() {
    // sign in form instance
    this.signInForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, Validators.required)
    });
  }


  onSignIn() {
    const userSignInForm = this.signInForm;
    this.validateCredentials(userSignInForm.get('userName').value, userSignInForm.get('password').value);
  }

  signInWithFB(): void {
    this.authorize();
    this.authService.signIn(FacebookLoginProvider.PROVIDER_ID).catch((error) => {
      this.socialSignInError = error.message;
      this.loginService.loginSucessful.next(null);
      console.log(this.socialSignInError);
      this.appUtilService.opensnackBar('Login Failed', 'Ok', 2000);
    });
  }

  signInWithGoogle(): void {
    this.authorize();
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID).catch((error) => {
      this.socialSignInError = error.message;
      this.loginService.loginSucessful.next(null);
      this.appUtilService.opensnackBar('Login Failed', 'Ok', 2000);
      console.log(this.socialSignInError);
    });
  }

  authorize() {
    this.authService.authState.subscribe((user) => {
      this.user = user;
      this.loggedIn = (user != null);
      if (user) {
        this.loginService.loginSucessful.next({ userName: user.name, role: 'Staff', loginStatus: true });
        this.router.navigate(['/home']);
      }
    });
  }

  // checks for valiidCredentials
  validateCredentials(userName: string, passwordEntered: string) {
    this.loginService.getUsers().subscribe(users => {
      let isValidUser = false;
      for (const user of users) {
        isValidUser = (user.userName === userName) ?
          (user.password === passwordEntered) ?
            true : false : false;
        if (isValidUser) {
          this.signInErr = false;
          this.loginService.loginSucessful.next({ userName: user.userName, role: user.role, loginStatus: true });
          this.loginService.setLoggedInUser({ userName: user.userName, role: user.role, loginStatus: true });
          this.appUtilService.opensnackBar('Logged in Successfully as ' + user.role, 'Ok', 2000);
          this.router.navigate(['/home']);
          break;
        }
      }
      if (!isValidUser) {
        this.loginService.loginSucessful.next(null);
        this.signInErr = true;
      }
    });
  }

  getSignInErrMsg(formField): string {
    const form = this.signInForm;
    let errMsg: string;
    switch (formField) {
      case 'USERNAME': errMsg = form.get('userName').hasError('required') ? 'Please enter user name' :
        form.get('userName').hasError('minlength') ? 'User name should have atleast 4 characters' : '';
                       break;
      case 'PASSWORD': errMsg = form.get('password').hasError('required') ? 'Please enter password' :
        form.get('password').hasError('minlength') ? 'Password should have atleast 4 characters' : '';
                       break;
      case 'SIGN_IN': errMsg = 'Invalid user name or password';
                      break;
      default: errMsg = 'Please enter valid data';
               break;
    }
    return errMsg;
  }

}
