import { Component, OnInit } from '@angular/core';
import { Gym } from 'src/app/shared/gym.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { AUTH_LEVEL, User } from 'src/app/shared/user.interface';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
    selector: 'app-gym-list',
    templateUrl: './gym-list.component.html',
    styleUrls: ['./gym-list.component.css']
})
export class GymListComponent implements OnInit {

    gyms: Gym[] = [];
    private isNotGuest = false;

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.currentUser.subscribe((user: User) => {
            this.isNotGuest = user !== null && user.auth_level > AUTH_LEVEL.GUEST;
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
