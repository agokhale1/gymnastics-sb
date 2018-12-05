import { Component, OnInit } from '@angular/core';
import { Gym } from 'src/app/shared/gym.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { AUTH_LEVEL, User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
    selector: 'app-gym-list',
    templateUrl: './gym-list.component.html',
    styleUrls: ['./gym-list.component.css']
})
export class GymListComponent implements OnInit {

    gym: Gym = {
        gym_id: 0,
        gym_name: '',
        gym_logo_url: ''
    };

    gyms: Gym[] = [];
    private isNotGuest = false;

    addGymForm: FormGroup;
    submitted = false;
    isUpdate = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });

        this.addGymForm = this.fb.group({
            gym_name: ['', [Validators.required, Validators.maxLength(100)]],
            gym_logo_url: ['', [Validators.maxLength(255)]]
        });

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
        return this.addGymForm.controls;
    }

    resetModal() {
        this.submitted = false;

        $('#addGymModal').modal('toggle');
        $('#addGymModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    addGym() {
        this.submitted = true;

        if (!this.addGymForm.valid) {
            return;
        }

        if (this.isUpdate)
        {
            this.update();
            return;
        }

        this.gym = this.addGymForm.value;
        if (this.gym.gym_logo_url == null) {
            this.gym.gym_logo_url = '';
        }
        console.log(this.gym);

        this.http.post<Gym>(`${config.apiUrl}/records/gyms`,
            this.gym,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update gym.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);
                this.gym.gym_id = resp.body;
                this.gyms.push(this.gym);
                // Navigate back to the list
                this.router.navigateByUrl(`/gyms#${this.gym.gym_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update gym. Server responded with ${err.status} ${err.statusText}`);
        });
    }

    edit(id: number) {
        this.http.get<Gym>(`${config.apiUrl}/records/gyms/${id}`)
        .subscribe((resp: Gym) => {

            console.log(resp);

            if (resp) {
                this.gym = resp;
                this.addGymForm.patchValue(this.gym);
                $('#addGymModal').modal('toggle');
            } else {
                this.gym = null;
            }
        });

        this.isUpdate = true;
    }

    update() {
        const gym_id = this.gym.gym_id;
        this.gym = this.addGymForm.value;
        this.gym.gym_id = gym_id;

        console.log(this.gym);

        this.http.put<number>(`${config.apiUrl}/records/gyms/${gym_id}`,
            this.gym,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update meet.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);

                // Fetch the updated item
                this.http.get<Gym>(`${config.apiUrl}/records/meets/${gym_id}`)
                .subscribe((newResp: Gym) => {

                    console.log(newResp);

                    if (resp) {
                        this.gym = newResp;

                        for (let i = 0; i < this.gyms.length; i++) {
                            if (this.gyms[i].gym_id === gym_id)
                            {
                                this.gyms[i] = this.gym;
                                break;
                            }
                        }
                    } else {
                        this.gym = null;
                    }
                });

                // Navigate back to the list
                this.router.navigateByUrl(`/gyms#${gym_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update gym. Server responded with ${err.status} ${err.statusText}`);
        });
        this.isUpdate = false;
    }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/gyms/${id}`, { observe: 'response' })
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not delete gym.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                // Remove entry
                this.gyms = this.gyms.filter((gym , i, arr) => {
                    return gym.gym_id !== id;
                });
            }
        });
    }

}
