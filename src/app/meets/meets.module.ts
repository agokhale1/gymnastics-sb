import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router } from '@angular/router';

import { MeetDetailComponent } from './meet-detail/meet-detail.component';
import { MeetListComponent } from './meet-list/meet-list.component';

const routes: Route[] = [
    { path: 'view/:id', component: MeetDetailComponent },
    { path: '', component: MeetListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        MeetDetailComponent,
        MeetListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class MeetsModule { }
