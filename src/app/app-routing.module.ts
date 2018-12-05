import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { AccessGuard } from './_guards/access-guard';
import { AUTH_LEVEL } from './shared/user.interface';
import { CurrentUserService } from './_services/current-user.service';

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
        loadChildren: './gymnasts/gymnasts.module#GymnastsModule',
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
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.ADMIN }
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    providers: [AccessGuard, CurrentUserService]
})
export class AppRoutingModule { }
