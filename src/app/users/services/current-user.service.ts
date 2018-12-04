import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})

export class CurrentUserService {
    private currentUserSubject: BehaviorSubject<User>;
    public currentUser: Observable<User>;

    constructor(http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
        this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): User {
        return this.currentUserSubject.value;
    }

    login(username: string, password: string): boolean {

        // TODO: Send HTTP request for this
        const user: User = {
            id: 2,
            login: username,
            password: password,
            authLevel: AUTH_LEVEL.GUEST
        };

        if (user) {
            localStorage.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user);
        }

        return true;
    }

    logout() {
        localStorage.removeItem('currentUser');
        this.currentUserSubject.next(null);
    }
}
