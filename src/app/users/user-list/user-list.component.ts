import { Component, OnInit } from '@angular/core';
import { User, Roles } from 'src/app/shared/user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    users: User[] = [];
    roles = Roles;

    constructor(private http: HttpClient) {
        this.http.get<ApiResponse<User>>(`${config.apiUrl}/records/users`)
        .subscribe((resp: ApiResponse<User>) => {

            console.log(resp);

            if (resp) {
                this.users = resp.records;
            } else {
                this.users = [];
            }
        });
    }

    ngOnInit() { }

    delete(id: number) {

        // One last check with the user
        const confirmed = confirm(`Are you sure you would like to delete user #${id}?`);
        if (!confirmed) {
            return;
        }

        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/users/${id}`, { observe: 'response' })
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not delete user.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                // Remove entry
                this.users = this.users.filter((user , i, arr) => {
                    return user.user_id !== id;
                });
            }
        });
    }

}
