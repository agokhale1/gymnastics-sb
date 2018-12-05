import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router } from '@angular/router';

import { MeetDetailComponent } from './meet-detail/meet-detail.component';
import { MeetListComponent } from './meet-list/meet-list.component';
import { ReactiveFormsModule } from '@angular/forms';
import { ScoresComponent } from './scores/scores.component';

const routes: Route[] = [
    { path: 'view/:id', component: ScoresComponent },
    { path: '', component: MeetListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        MeetDetailComponent,
        MeetListComponent,
        ScoresComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class MeetsModule { }
