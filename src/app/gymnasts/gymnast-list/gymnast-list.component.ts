import { Component, OnInit } from '@angular/core';
import { Gymnast } from 'src/app/shared/gymnast.interface';

@Component({
    selector: 'app-gymnast-list',
    templateUrl: './gymnast-list.component.html',
    styleUrls: ['./gymnast-list.component.css']
})
export class GymnastListComponent implements OnInit {

    gymnasts: Gymnast[] = [];

    constructor() {
        this.gymnasts = [];
    }

    ngOnInit() { }

}
