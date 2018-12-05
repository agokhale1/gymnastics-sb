import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { GymnastNewComponent } from './gymnast-new/gymnast-new.component';
import { GymnastEditComponent } from './gymnast-edit/gymnast-edit.component';
import { GymnastDetailComponent } from './gymnast-detail/gymnast-detail.component';
import { GymnastListComponent } from './gymnast-list/gymnast-list.component';

const routes: Route[] = [
    { path: 'new', component: GymnastNewComponent },
    { path: 'edit/:id', component: GymnastEditComponent },
    { path: 'view/:id', component: GymnastDetailComponent },
    { path: '', component: GymnastListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        GymnastNewComponent,
        GymnastEditComponent,
        GymnastDetailComponent,
        GymnastListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class GymnastsModule { }
