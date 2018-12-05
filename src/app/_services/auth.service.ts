import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';

import { map } from 'rxjs/operators';
import { config } from './config.interface';

@Injectable({
    providedIn: 'root'
})

export class AuthService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): Observable<boolean> {

        const body = new HttpParams()
        .set('username', username)
        .set('password', password);

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post(`${config.apiUrl}/authenticate`,
        body.toString(),
        {
            headers: headers
        })
        .pipe(map((user: User) => {
            console.log(user);

            if (user) {
                console.log('API auth returned true');

                user.authToken = window.btoa(username + ':' + password);
                this.currentUserSubject.next(user);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));

                return true;
            } else {
                console.log('API auth returned false');

                this.currentUserSubject.next(null);

                return false;
            }
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
