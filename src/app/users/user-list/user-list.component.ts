import { Component, OnInit } from '@angular/core';
import { User, Roles, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
    selector: 'app-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

    user: User = {
        user_id: 0,
        login: '',
        password: '',
        auth_level: AUTH_LEVEL.GUEST
    };

    users: User[] = [];
    roles = Roles;

    addUserForm: FormGroup;
    submitted = false;
    isUpdate = false;

    constructor(private http: HttpClient, private fb: FormBuilder, private router: Router) {
        this.addUserForm = this.fb.group({
            login: ['', [Validators.required, Validators.maxLength(25)]],
            password: ['', [Validators.maxLength(255)]],
            auth_level: ['', []]
        });

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

    get form() {
        return this.addUserForm.controls;
    }

    levels(): Array<string> {
        const keys = Object.keys(AUTH_LEVEL);

        // Only return the numeric keys
        return keys.slice(0, keys.length / 2);
    }

    resetModal() {
        this.submitted = false;

        $('#addUserModal').modal('toggle');
        $('#addUserModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    addUser() {
        this.submitted = true;

        if (!this.addUserForm.valid) {
            return;
        }

        if (this.isUpdate)
        {
            this.update();
            return;
        }

        this.user = this.addUserForm.value;
        console.log(this.user);

        this.http.post<User>(`${config.apiUrl}/records/users`,
            this.user,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update user.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);
                this.user.user_id = resp.body;
                this.users.push(this.user);
                // Navigate back to the list
                this.router.navigateByUrl(`/users#${resp.body}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update user. Server responded with ${err.status} ${err.statusText}`);
        });
    }

    edit(id: number) {
        this.http.get<User>(`${config.apiUrl}/records/users/${id}`)
        .subscribe((resp: User) => {

            console.log(resp);

            if (resp) {
                this.user = resp;
                this.addUserForm.patchValue(this.user);
                $('#addUserModal').modal('toggle');
            } else {
                this.user = null;
            }
        });

        this.isUpdate = true;
    }

    update() {
        const user_id = this.user.user_id;
        this.user = this.addUserForm.value;
        this.user.user_id = user_id;

        console.log(this.user);

        this.http.put<number>(`${config.apiUrl}/records/users/${user_id}`,
            this.user,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update user.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);

                for (let i in this.users) {
                    if(this.users[i].user_id === user_id)
                    {
                        this.users[i] = this.user;
                        break;
                    }
                }

                // Navigate back to the list
                this.router.navigateByUrl(`/users#${user_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update user. Server responded with ${err.status} ${err.statusText}`);
        });
        this.isUpdate = false;
    }

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
