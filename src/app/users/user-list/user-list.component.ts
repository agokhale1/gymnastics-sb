import { Component, OnInit } from '@angular/core';
import { User, AUTH_LEVEL, Roles } from 'src/app/shared/user.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[] = [];
    roles = Roles;

    constructor() {
        this.users.push({
            id: 0,
            login: 'test1',
            password: 'test',
            auth_level: AUTH_LEVEL.GUEST
        },
        {
            id: 1,
            login: 'test3',
            password: 'test',
            auth_level: AUTH_LEVEL.GUEST
        },
        {
            id: 2,
            login: 'test4',
            password: 'test',
            auth_level: AUTH_LEVEL.GUEST
        },
        {
            id: 3,
            login: 'test5',
            password: 'test',
            auth_level: AUTH_LEVEL.GUEST
        },
        {
            id: 4,
            login: 'test6',
            password: 'test',
            auth_level: AUTH_LEVEL.GUEST
        });
    }

    ngOnInit() {
    }

}
