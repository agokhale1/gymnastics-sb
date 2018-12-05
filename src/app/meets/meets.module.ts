import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule, Router } from '@angular/router';

import { MeetNewComponent } from './meet-new/meet-new.component';
import { MeetEditComponent } from './meet-edit/meet-edit.component';
import { MeetDetailComponent } from './meet-detail/meet-detail.component';
import { MeetListComponent } from './meet-list/meet-list.component';

const routes: Route[] = [
    { path: 'new', component: MeetDetailComponent },
    { path: 'edit/:id', component: MeetEditComponent },
    { path: 'view/:id', component: MeetDetailComponent },
    { path: '', component: MeetListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        MeetNewComponent,
        MeetEditComponent,
        MeetDetailComponent,
        MeetListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class MeetsModule { }
