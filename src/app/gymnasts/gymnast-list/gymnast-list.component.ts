import { Component, OnInit } from '@angular/core';
import { Gymnast, GYMNAST_LEVEL } from 'src/app/shared/gymnast.interface';

@Component({
    selector: 'app-gymnast-list',
    templateUrl: './gymnast-list.component.html',
    styleUrls: ['./gymnast-list.component.css']
})
export class GymnastListComponent implements OnInit {

    gymnasts: Gymnast[] = [];

    constructor() {
        this.gymnasts.push({
            id: 0,
            gym: {
                id: 0,
                name: 'test',
                logoUrl: '#'
            },
            active: true,
            firstName: 'First',
            lastName: 'Last',
            level: GYMNAST_LEVEL.NA
        },
        {
            id: 1,
            gym: {
                id: 0,
                name: 'test',
                logoUrl: '#'
            },
            active: true,
            firstName: 'Test',
            lastName: 'Name',
            level: GYMNAST_LEVEL.NA
        },
        {
            id: 2,
            gym: {
                id: 0,
                name: 'test',
                logoUrl: '#'
            },
            active: true,
            firstName: 'Ya',
            lastName: 'Boi',
            level: GYMNAST_LEVEL.NA
        },
        {
            id: 3,
            gym: {
                id: 1,
                name: 'rand',
                logoUrl: '#'
            },
            active: true,
            firstName: 'Idiot',
            lastName: 'Sandwich',
            level: GYMNAST_LEVEL.NA
        },
        {
            id: 4,
            gym: {
                id: 2,
                name: 'gymname',
                logoUrl: '#'
            },
            active: true,
            firstName: 'My',
            lastName: 'Boi',
            level: GYMNAST_LEVEL.NA
        });
    }

    ngOnInit() { }

}
