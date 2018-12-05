import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { GymListComponent } from './gym-list/gym-list.component';

const routes: Route[] = [
    { path: 'view/:id', component: GymDetailComponent },
    { path: '', component: GymListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        GymDetailComponent,
        GymListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class GymsModule { }
