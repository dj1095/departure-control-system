import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { LoginService } from '../login.service';
import { AppUtilService } from '../app-util.service';
import { take, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class AuthGuard implements CanActivate {
    constructor(private router: Router, private loginService: LoginService,
                private appUtilService: AppUtilService) {

    }

    canActivate(route: ActivatedRouteSnapshot): boolean
        | UrlTree
        | Promise<boolean | UrlTree>
        | Observable<boolean | UrlTree> {
        return this.loginService.loginSucessful.pipe(take(1),
            map(loginDetails => {
                const isAuth = !!loginDetails;
                if (isAuth && loginDetails.loginStatus) {
                    return true;
                }
                return this.router.createUrlTree(['/auth']);
            })
        );
   // return true;
     }
}
