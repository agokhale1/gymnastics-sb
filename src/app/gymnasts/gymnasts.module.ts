import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { GymnastDetailComponent } from './gymnast-detail/gymnast-detail.component';
import { GymnastListComponent } from './gymnast-list/gymnast-list.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
    { path: 'view/:id', component: GymnastDetailComponent },
    { path: '', component: GymnastListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        GymnastDetailComponent,
        GymnastListComponent,
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class GymnastsModule { }
