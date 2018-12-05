import { Component, OnInit } from '@angular/core';
import { Meet } from 'src/app/shared/meet.interface';

@Component({
    selector: 'app-meet-list',
    templateUrl: './meet-list.component.html',
    styleUrls: ['./meet-list.component.css']
})
export class MeetListComponent implements OnInit {

    meets: Meet[] = [];

    constructor() {
        this.meets = [];
    }

    ngOnInit() { }

}
