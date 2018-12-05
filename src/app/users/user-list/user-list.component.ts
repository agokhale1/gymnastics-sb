import { Component, OnInit } from '@angular/core';
import { User, AUTH_LEVEL, Roles } from 'src/app/shared/user.interface';
import { HttpClient } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { config } from 'src/app/_services/config.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[] = [];
    roles = Roles;

    constructor(private http: HttpClient) {

        this.http.get(`${config.apiUrl}/records/users`)
        .subscribe((userList) => {

            if (userList) {
                this.users = userList['records'];
            } else {
                this.users = [];
            }
        });
    }

    ngOnInit() {
    }

}
