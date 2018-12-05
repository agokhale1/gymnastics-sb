import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/shared/gymnast.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { config } from 'src/app/_services/config.interface';
import { ApiResponse } from 'src/app/shared/api-response.interface';

@Component({
    selector: 'app-gymnast-list',
    templateUrl: './gymnast-list.component.html',
    styleUrls: ['./gymnast-list.component.css']
})
export class GymnastListComponent implements OnInit {

    gymnasts: Gymnast[] = [];

    constructor(private http: HttpClient) {
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
                this.gymnasts = this.gymnasts.filter((gymnast , i, arr) => {
                    return gymnast.gymnast_id !== id;
                });
            }
        });
    }

}
