import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { GymNewComponent } from './gym-new/gym-new.component';
import { GymEditComponent } from './gym-edit/gym-edit.component';
import { GymItemComponent } from './gym-item/gym-item.component';
import { GymDetailComponent } from './gym-detail/gym-detail.component';
import { GymListComponent } from './gym-list/gym-list.component';

const routes: Route[] = [
    { path: 'new', component: GymNewComponent },
    { path: 'edit/:id', component: GymEditComponent },
    { path: 'view/:id', component: GymDetailComponent },
    { path: '', component: GymListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        GymNewComponent,
        GymEditComponent,
        GymItemComponent,
        GymDetailComponent,
        GymListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class GymsModule { }
