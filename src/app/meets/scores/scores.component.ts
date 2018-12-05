import { Component, OnInit } from '@angular/core';
import { Score } from 'src/app/shared/score.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { config } from 'src/app/_services/config.interface';

import { HttpClient, HttpResponse } from '@angular/common/http';
import { AuthService } from 'src/app/_services/auth.service';
import { AUTH_LEVEL, User } from 'src/app/shared/user.interface';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';

import * as $ from 'jquery';
import { updateBinding } from '@angular/core/src/render3/instructions';
import { Gymnast } from 'src/app/shared/gymnast.interface';
import { Event } from 'src/app/shared/event.interface';

@Component({
    selector: 'app-scores',
    templateUrl: './scores.component.html',
    styleUrls: ['./scores.component.css']
})
export class ScoresComponent implements OnInit {

    score = {
        score_id: 0,
        meet_id: null,
        gymnast_id: null,
        event_id: null,
        score: 0
    };

    meetId: number;
    scores: Score[] = [];
    gymnasts: Gymnast[] = [];
    events: Event[] = [];
    isNotGuest = false;

    addScoreForm: FormGroup;
    submitted = false;
    isUpdate = false;

    constructor(private http: HttpClient, private authService: AuthService, private fb: FormBuilder, private router: Router, private route: ActivatedRoute) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
        });

        this.meetId = +this.route.snapshot.params['id'];

        this.addScoreForm = this.fb.group({
            gymnast_id: ['', [Validators.required, Validators.nullValidator]],
            event_id: ['', [Validators.required, Validators.nullValidator]],
            score: ['', [Validators.required, Validators.min(0), Validators.max(10)]]
        });

        this.http.get<ApiResponse<Score>>(`${config.apiUrl}/records/scores?join=gymnasts&join=meets&join=events&filter=meet_id,eq,${this.meetId}`)
        .subscribe((resp: ApiResponse<Score>) => {

            console.log(resp);

            if (resp) {
                this.scores = resp.records;
            } else {
                this.scores = [];
            }
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

        this.http.get<ApiResponse<Event>>(`${config.apiUrl}/records/events`)
        .subscribe((resp: ApiResponse<Event>) => {

            console.log(resp);

            if (resp) {
                this.events = resp.records;
            } else {
                this.events = [];
            }
        });
    }

    ngOnInit() { }

    get form() {
        return this.addScoreForm.controls;
    }

    resetModal() {
        this.submitted = false;

        $('#addScoreModal').modal('toggle');
        $('#addScoreModal').on('hidden.bs.modal', function () {
            $(this).find('form').trigger('reset');
        });
    }

    addScore() {
        this.submitted = true;

        if (!this.addScoreForm.valid) {
            return;
        }

        if (this.isUpdate) {
            this.update();
            return;
        }

        this.score = this.addScoreForm.value;
        this.score.meet_id = this.meetId;
        console.log(this.score);

        this.http.post<Score>(`${config.apiUrl}/records/scores`,
            this.score,
            { observe: 'response' }
        )
            .subscribe((resp: HttpResponse<any>) => {
                if (!resp.ok) {
                    alert(`Could not update score.\nHTTP Response: ${resp.status} ${resp.statusText}`);
                } else {
                    console.log(resp.body);
                    this.score.score_id = resp.body;
                    this.scores.push(this.score);
                    // Navigate back to the list
                    this.router.navigateByUrl(`/meets/view/${this.meetId}#${this.score.score_id}`);
                    this.resetModal();
                }
            },
                err => {
                    alert(`Could not update score. Server responded with ${err.status} ${err.statusText}`);
                });
    }

    edit(id: number) {
        this.http.get<Score>(`${config.apiUrl}/records/scores/${id}`)
            .subscribe((resp: Score) => {

                console.log(resp);

                if (resp) {
                    this.score = resp;
                    this.addScoreForm.patchValue(this.score);
                    $('#addScoreModal').modal('toggle');
                } else {
                    this.score = null;
                }
            });

        this.isUpdate = true;
    }

    update() {
        const score_id = this.score.score_id;
        this.score = this.addScoreForm.value;
        this.score.score_id = score_id;
        this.score.meet_id = this.meetId;

        console.log(this.score);

        this.http.put<number>(`${config.apiUrl}/records/scores/${score_id}`,
            this.score,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update score.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);

                // Fetch the updated item
                this.http.get<Score>(`${config.apiUrl}/records/scores/${score_id}?join=gymnasts&join=meets&join=events`)
                .subscribe((newResp: Score) => {

                    console.log(newResp);

                    if (newResp) {
                        this.score = newResp;

                        for (let i = 0; i < this.scores.length; i++) {
                            if (this.scores[i].score_id === score_id) {
                                this.scores[i] = this.score;
                                break;
                            }
                        }

                    } else {
                        this.score = null;
                    }
                });

                // Navigate back to the list
                this.router.navigateByUrl(`/meets/view/${this.meetId}#${score_id}`);
                this.resetModal();
            }
        },
        err => {
            alert(`Could not update score. Server responded with ${err.status} ${err.statusText}`);
        });
        this.isUpdate = false;
    }

    delete(id: number) {
        this.http.delete<HttpResponse<any>>(`${config.apiUrl}/records/scores/${id}`, { observe: 'response' })
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not delete score.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                // Remove entry
                this.scores = this.scores.filter((score, i, arr) => {
                    return score.score_id !== id;
                });
            }
        });
    }

}
