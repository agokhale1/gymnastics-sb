import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/shared/gymnast.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

import * as $ from 'jquery';

@Component({
    selector: 'app-gymnast-list',
    templateUrl: './gymnast-list.component.html',
    styleUrls: ['./gymnast-list.component.css']
})
export class GymnastListComponent implements OnInit {

    gymnasts: Gymnast[] = [];
    private isNotGuest = false;

    addGymnastForm: FormGroup;
    submitted = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });

        this.addGymnastForm = this.fb.group({
            firstName: ['', [Validators.required, Validators.maxLength(25)]],
            lastName: ['', [Validators.required, Validators.maxLength(35)]],
            gym: ['', [Validators.required, Validators.maxLength(100)]],
            level: ['', [Validators.required, Validators.maxLength(15)]]
        });

        this.http.get<ApiResponse<Gymnast>>(`${config.apiUrl}/records/gymnasts`)
            .subscribe((resp: ApiResponse<Gymnast>) => {

                console.log(resp);

                if (resp) {
                    this.gymnasts = resp.records;
                } else {
                    this.gymnasts = [];
                }
            });
    }

    ngOnInit() { }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/gymnasts/${id}`, { observe: 'response' })
            .subscribe((resp: HttpResponse<any>) => {
                if (!resp.ok) {
                    alert(`Could not delete user.\nHTTP Response: ${resp.status} ${resp.statusText}`);
                } else {
                    // Remove entry
                    this.gymnasts = this.gymnasts.filter((gymnast, i, arr) => {
                        return gymnast.gymnast_id !== id;
                    });
                }
            });
    }

    get form() {
        return this.addGymnastForm.controls;
    }

    cancel() {
        this.submitted = false;

        $('#addGymnastModal').modal('toggle');
        $('#addGymnastModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    addGymnast() {
        this.submitted = true;

        if (!this.addGymnastForm.valid) {
            return;
        }
    }

}
