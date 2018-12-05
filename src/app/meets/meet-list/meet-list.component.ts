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
        this.meets.push({
            id: 0,
            title: 'Zero',
            date: 'NOW',
            location: '#'
        },
        {
            id: 1,
            title: 'One',
            date: 'NOW',
            location: '#'
        },
        {
            id: 2,
            title: 'Two',
            date: 'NOW',
            location: '#'
        },
        {
            id: 3,
            title: 'Three',
            date: 'NOW',
            location: '#'
        },
        {
            id: 4,
            title: 'Four',
            date: 'NOW',
            location: '#'
        });
    }

    ngOnInit() { }

}
