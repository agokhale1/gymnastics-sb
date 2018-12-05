import { Component, OnInit } from '@angular/core';
import { Meet } from 'src/app/shared/meet.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';
import { config } from 'src/app/_services/config.interface';

import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-meet-list',
    templateUrl: './meet-list.component.html',
    styleUrls: ['./meet-list.component.css']
})
export class MeetListComponent implements OnInit {

    meets: Meet[] = [];

    constructor(private http: HttpClient) {
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

}
