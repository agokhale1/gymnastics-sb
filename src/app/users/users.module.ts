import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { UserListComponent } from './user-list/user-list.component';
import { ReactiveFormsModule } from '@angular/forms';

const routes: Route[] = [
    { path: '', component: UserListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        UserListComponent
    ],
    imports: [
        CommonModule,
        ReactiveFormsModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }
