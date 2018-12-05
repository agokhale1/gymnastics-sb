import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/shared/score.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { AuthService } from 'src/app/_services/auth.service';
import { User, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';


import * as $ from 'jquery';
import { Router } from '@angular/router';
import { Meet } from 'src/app/shared/meet.interface';

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

    meet: Meet;
    scores: Score[] = [];

    private isNotGuest = false;

    editForm: FormGroup;
    submitted = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private router: Router) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });
    }

    ngOnInit() {
    }

    toggleModal() {
        $('#addGymnastModal').modal('toggle');
    }

    cancel() {
        this.submitted = false;

        $('#addGymnastModal').modal('toggle');
        $('#addGymnastModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    create() {
        this.submitted = true;

        if (!this.addGymnastForm.valid) {
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

                // Add the gymnast and hide the modal
                gymnast.gymnast_id = resp.body;
                this.gymnasts.push(gymnast);
                this.toggleModal();

                // Jump to the new gymnast
                this.router.navigateByUrl(`/gymnasts#${resp.body}`);
            }
        },
        err => {
            alert(`Could not update gymnast. Server responded with ${err.status} ${err.statusText}`);
        });
    }

    edit(id: number) {
        this.toggleModal();

        this.currentGymnast = this.gymnasts.find(function (val, i, arr) {
            return val.gymnast_id === id;
        });

        this.addGymnastForm.patchValue(this.currentGymnast);
    }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/gymnasts/${id}`, { observe: 'response' })
            .subscribe((resp: HttpResponse<any>) => {
                if (!resp.ok) {
                    alert(`Could not delete gymnast.\nHTTP Response: ${resp.status} ${resp.statusText}`);
                } else {
                    // Remove entry
                    this.gymnasts = this.gymnasts.filter((gymnast, i, arr) => {
                        return gymnast.gymnast_id !== id;
                    });
                }
            });
    }

}
