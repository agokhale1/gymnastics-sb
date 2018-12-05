import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/shared/gymnast.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Gym } from 'src/app/shared/gym.interface';


import * as $ from 'jquery';
import { Router } from '@angular/router';

@Component({
    selector: 'app-gymnast-list',
    templateUrl: './gymnast-list.component.html',
    styleUrls: ['./gymnast-list.component.css']
})
export class GymnastListComponent implements OnInit {

    gymnasts: Gymnast[] = [];
    gyms: Gym[] = [];
    currentGymnast: Gymnast = null;

    private isNotGuest = false;

    addGymnastForm: FormGroup;
    submitted = false;
    isUpdate = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });

        this.addGymnastForm = this.fb.group({
            gymnast_first_name: ['', [Validators.required, Validators.maxLength(25)]],
            gymnast_last_name: ['', [Validators.required, Validators.maxLength(35)]],
            gym_id: ['', Validators.nullValidator],
            gymnast_level: ['', [Validators.required, Validators.maxLength(15)]]
        });

        // Fetch all gymnasts
        this.http.get<ApiResponse<Gymnast>>(`${config.apiUrl}/records/gymnasts?join=gyms`)
        .subscribe((resp: ApiResponse<Gymnast>) => {

            console.log(resp);
            console.log(resp.records[0].gym_id);

            if (resp) {
                this.gymnasts = resp.records;
            } else {
                this.gymnasts = [];
            }
        });

        // Fetch all gyms
        this.http.get<ApiResponse<Gym>>(`${config.apiUrl}/records/gyms`)
        .subscribe((resp: ApiResponse<Gym>) => {

            console.log(resp);

            if (resp) {
                this.gyms = resp.records;
            } else {
                this.gyms = [];
            }
        });
    }

    ngOnInit() { }

    get form() {
        return this.addGymnastForm.controls;
    }

    toggleModal() {
        $('#addGymnastModal').modal('toggle');
    }

    resetModal() {
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

        if (this.isUpdate)
        {
            this.update();
            return;
        }

        const gymnast = this.addGymnastForm.value;
        gymnast.active = true;
        console.log(gymnast);

        this.http.post<Gymnast>(`${config.apiUrl}/records/gymnasts`,
            gymnast,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update gymnast.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                gymnast.gymnast_id = resp.body;
                this.gymnasts.push(gymnast);
                // Navigate back to the list
                this.router.navigateByUrl(`/gymnasts#${resp.body}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update gymnast. Server responded with ${err.status} ${err.statusText}`);
        });
    }

    edit(id: number) {
        this.http.get<Gymnast>(`${config.apiUrl}/records/gymnasts/${id}`)
        .subscribe((resp: Gymnast) => {

            console.log(resp);

            if (resp) {
                this.currentGymnast = resp;
                this.addGymnastForm.patchValue(this.currentGymnast);
                $('#addGymnastModal').modal('toggle');
            } else {
                this.currentGymnast = null;
            }
        });

        this.isUpdate = true;
    }

    update() {
        const gymnast_id = this.currentGymnast.gymnast_id;
        this.currentGymnast = this.addGymnastForm.value;
        this.currentGymnast.gymnast_id = gymnast_id;

        console.log(this.currentGymnast);

        this.http.put<number>(`${config.apiUrl}/records/gymnasts/${gymnast_id}`,
            this.currentGymnast,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update gymnast.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);

                for (let i in this.gymnasts) {
                    if(this.gymnasts[i].gymnast_id === gymnast_id)
                    {
                        this.gymnasts[i] = this.currentGymnast;
                        break;
                    }
                }

                // Navigate back to the list
                this.router.navigateByUrl(`/gymnasts#${gymnast_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update gymnast. Server responded with ${err.status} ${err.statusText}`);
        });
        this.isUpdate = false;
    }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/gymnasts/${id}`, { observe: 'response' })
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not delete gymnast.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                // Remove entry
                this.gymnasts = this.gymnasts.filter((gymnast , i, arr) => {
                    return gymnast.gymnast_id !== id;
                });
            }
        });
    }

}
