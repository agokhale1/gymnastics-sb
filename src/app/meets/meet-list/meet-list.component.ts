import { Component, OnInit } from '@angular/core';
import { Meet } from 'src/app/shared/meet.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { config } from 'src/app/_services/config.interface';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { AUTH_LEVEL, User } from 'src/app/shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import * as $ from 'jquery';

@Component({
    selector: 'app-meet-list',
    templateUrl: './meet-list.component.html',
    styleUrls: ['./meet-list.component.css']
})
export class MeetListComponent implements OnInit {

    meet: Meet = {
        meet_id: 0,
        meet_title: '',
        meet_date: Date.now().toString(),
        meet_location: ''
    };

    meets: Meet[] = [];
    private isNotGuest = false;

    addMeetForm: FormGroup;
    submitted = false;
    isUpdate = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });

        this.addMeetForm = this.fb.group({
            meet_title: ['', [Validators.maxLength(100)]],
            meet_date: ['', [Validators.required, Validators.maxLength(100)]],
            meet_location: ['', [Validators.maxLength(100)]]
        });

        this.http.get<ApiResponse<Meet>>(`${config.apiUrl}/records/meets`)
        .subscribe((resp: ApiResponse<Meet>) => {

            console.log(resp);

            if (resp) {
                this.meets = resp.records;
            } else {
                this.meets = [];
            }
        });
    }

    ngOnInit() { }

    get form() {
        return this.addMeetForm.controls;
    }

    resetModal() {
        this.submitted = false;

        $('#addMeetModal').modal('toggle');
        $('#addMeetModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    addMeet() {
        this.submitted = true;

        if (!this.addMeetForm.valid) {
            return;
        }

        if (this.isUpdate)
        {
            this.update();
            return;
        }

        this.meet = this.addMeetForm.value;
        if (this.meet.meet_location == null) {
            this.meet.meet_location = '';
        }
        console.log(this.meet);

        this.http.post<Meet>(`${config.apiUrl}/records/meets`,
            this.meet,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update meet.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);
                this.meet.meet_id = resp.body;
                this.meets.push(this.meet);
                // Navigate back to the list
                this.router.navigateByUrl(`/meets#${this.meet.meet_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update meet. Server responded with ${err.status} ${err.statusText}`);
        });
    }

    edit(id: number) {
        this.http.get<Meet>(`${config.apiUrl}/records/meets/${id}`)
        .subscribe((resp: Meet) => {

            console.log(resp);

            if (resp) {
                this.meet = resp;
                this.addMeetForm.patchValue(this.meet);
                $('#addMeetModal').modal('toggle');
            } else {
                this.meet = null;
            }
        });

        this.isUpdate = true;
    }

    update() {
        const meet_id = this.meet.meet_id;
        this.meet = this.addMeetForm.value;
        this.meet.meet_id = meet_id;

        console.log(this.meet);

        this.http.put<number>(`${config.apiUrl}/records/meets/${meet_id}`,
            this.meet,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update meet.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);

                // Fetch the updated item
                this.http.get<Meet>(`${config.apiUrl}/records/meets/${meet_id}`)
                .subscribe((newResp: Meet) => {

                    console.log(newResp);

                    if (resp) {
                        this.meet = newResp;

                        for (let i = 0; i < this.meets.length; i++) {
                            if (this.meets[i].meet_id === meet_id)
                            {
                                this.meets[i] = this.meet;
                                break;
                            }
                        }
                    } else {
                        this.meet = null;
                    }
                });

                // Navigate back to the list
                this.router.navigateByUrl(`/meets#${meet_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update meet. Server responded with ${err.status} ${err.statusText}`);
        });
        this.isUpdate = false;
    }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/meets/${id}`, { observe: 'response' })
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not delete meet.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                // Remove entry
                this.meets = this.meets.filter((meet , i, arr) => {
                    return meet.meet_id !== id;
                });
            }
        });
    }

    view(id: number) {
        this.router.navigate([`/meets/view/${id}`]);
    }

}
