import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { MeetsComponent } from './meets/meets.component';
import { GymsComponent } from './gyms/gyms.component';
import { AccessGuard } from './shared/access-guard';
import { User, AUTH_LEVEL } from './shared/user.interface';
import { UsersComponent } from './users/users.component';
import { CurrentUserService } from './users/services/current-user.service';

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
        component: MeetsComponent,
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.GUEST }
    },
    {
        path: 'gyms',
        component: GymsComponent,
        canActivate: [AccessGuard],
        data: { requiredAuthLevel: AUTH_LEVEL.GUEST }
    },
    {
        path: 'users',
        component: UsersComponent,
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
