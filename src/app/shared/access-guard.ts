import { Injectable } from '@angular/core';
import { CanActivate, UrlTree, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User, AUTH_LEVEL } from './user.interface';
import { CurrentUserService } from '../users/services/current-user.service';


@Injectable()
export class AccessGuard implements CanActivate {
    constructor(private router: Router, private authService: CurrentUserService) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
        const requiredAuthLevel: AUTH_LEVEL = route.data.requiredAuthLevel || AUTH_LEVEL.GUEST;

        console.log('Required auth level: ' + requiredAuthLevel);
        console.log('Current auth level: ' + this.authService.currentUserValue.auth_level);

        if (this.authService.currentUserValue && this.authService.currentUserValue.auth_level >= requiredAuthLevel) {
            return true;
        } else {
            // TODO: Change this to unauthorized page
            this.router.navigate(['/login'], {
                queryParams: {
                    return: state.url
                }
            });
        }

        return false;
    }
}
