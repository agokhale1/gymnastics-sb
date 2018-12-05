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
        this.gyms = [];
    }

    ngOnInit() { }

}
