import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/login.component';
import { AUTH_LEVEL } from './shared/user.interface';
import { AccessGuard } from './_guards/access-guard';
import { AuthService } from './_services/auth.service';

const routes: Routes = [
    {
        path: '',
        redirectTo: '/login',
        pathMatch: 'full'
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'meets',
        loadChildren: './meets/meets.module#MeetsModule',
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.GUEST }
    },
    {
        path: 'gyms',
        loadChildren: './gyms/gyms.module#GymsModule',
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.GUEST }
    },
    {
        path: 'gymnasts',
        loadChildren: './gymnasts/gymnasts.module#GymnastsModule',
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.GUEST }
    },
    {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.ADMIN }
    },
    {
        path: '**',
        redirectTo: '',
        pathMatch: 'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AccessGuard, AuthService]
})
export class AppRoutingModule { }
