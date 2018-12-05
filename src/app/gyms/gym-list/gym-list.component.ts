import { Component, OnInit } from '@angular/core';
import { Gym } from 'src/app/shared/gym.interface';

@Component({
    selector: 'app-gym-list',
    templateUrl: './gym-list.component.html',
    styleUrls: ['./gym-list.component.css']
})
export class GymListComponent implements OnInit {

    gyms: Gym[] = [];

    constructor() {
        this.gyms.push({
            id: 0,
            name: 'Zero',
            logoUrl: '#'
        },
        {
            id: 1,
            name: 'One',
            logoUrl: '#'
        },
        {
            id: 2,
            name: 'Two',
            logoUrl: '#'
        },
        {
            id: 3,
            name: 'Three',
            logoUrl: '#'
        },
        {
            id: 4,
            name: 'Four',
            logoUrl: '#'
        });
    }

    ngOnInit() { }

}
