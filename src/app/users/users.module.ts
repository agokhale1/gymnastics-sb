import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Route[] = [
    { path: 'new', component: UserNewComponent },
    { path: 'edit/:id', component: UserEditComponent },
    { path: '', component: UserListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        UserNewComponent,
        UserEditComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }
