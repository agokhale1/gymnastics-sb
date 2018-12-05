import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Route, RouterModule } from '@angular/router';

import { UserNewComponent } from './user-new/user-new.component';
import { UserEditComponent } from './user-edit/user-edit.component';
import { UserItemComponent } from './user-item/user-item.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserListComponent } from './user-list/user-list.component';

const routes: Route[] = [
    { path: 'new', component: UserDetailComponent },
    { path: 'edit/:id', component: UserEditComponent },
    { path: 'view/:id', component: UserDetailComponent },
    { path: '', component: UserListComponent, pathMatch: 'full' }
];

@NgModule({
    declarations: [
        UserNewComponent,
        UserEditComponent,
        UserItemComponent,
        UserDetailComponent,
        UserListComponent,
    ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes)
    ]
})
export class UsersModule { }
