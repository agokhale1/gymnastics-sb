import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { HttpClient, HttpParams, HttpHeaders, HttpResponse } from '@angular/common/http';

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

    login(username: string, password: string): Observable<number> {

        const body = new HttpParams()
        .set('username', username)
        .set('password', password);

        const headers = new HttpHeaders()
        .set('Content-Type', 'application/x-www-form-urlencoded');

        return this.http.post<HttpResponse<any>>(`${config.apiUrl}/authenticate`,
        body.toString(),
        {
            observe: 'response',
            headers: headers
        },
        )
        .pipe(map((resp: HttpResponse<any>) => {
            if (resp.ok) {
                console.log(`API auth returned ${resp.status} ${resp.statusText}`);

                const user: User = resp.body;

                user.authToken = window.btoa(username + ':' + password);
                this.currentUserSubject.next(user);
                localStorage.setItem('currentUser', JSON.stringify(this.currentUserValue));

                return resp.status;
            } else {
                console.log(`API auth returned ${resp.status} ${resp.statusText}`);

                this.currentUserSubject.next(null);

                return resp.status;
            }
        }));
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
