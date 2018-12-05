import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';

/*
  Based on code from: http://jasonwatmore.com/post/2018/09/07/angular-6-basic-http-authentication-tutorial-example
*/

@Injectable()
export class BasicAuthInterceptor implements HttpInterceptor {
    constructor(private authService: AuthService) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with basic auth credentials if available
        const currentUser = this.authService.currentUserValue;

        if (currentUser && currentUser.authHeader) {
            request = request.clone({
                setHeaders: {
                    Authorization: `Basic ${currentUser.authHeader}`
                }
            });
        }

        return next.handle(request);
    }
}
