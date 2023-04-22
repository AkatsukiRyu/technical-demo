import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthenticationService } from './authentication.service';

@Injectable()
export class HomeCanActivateGuard implements CanActivate {

    constructor(
        private readonly authService: AuthenticationService,
        private readonly router: Router,
    ) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ): Observable<boolean> | Promise<boolean> | boolean {
        return this.authService.getUserLogin()
            .pipe(
                map(user => {
                    const isUserLogin = !!user;

                    if (!isUserLogin) {
                        this.router.navigate(['auths'])
                    }

                    return isUserLogin;
                })
            );
    }
}
