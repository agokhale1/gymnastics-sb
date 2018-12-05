import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
import { MeetsComponent } from './meets/meets.component';
import { GymsComponent } from './gyms/gyms.component';
import { UsersComponent } from './users/users.component';
import { GymnastsComponent } from './gymnasts/gymnasts.component';
import { GymnastNewComponent } from './gymnasts/gymnast-new/gymnast-new.component';
import { GymnastListComponent } from './gymnasts/gymnast-list/gymnast-list.component';
import { GymnastItemComponent } from './gymnasts/gymnast-item/gymnast-item.component';
import { GymnastDetailComponent } from './gymnasts/gymnast-detail/gymnast-detail.component';

@NgModule({
    declarations: [
        AppComponent,
        NavbarComponent,
        LoginComponent,
        MeetsComponent,
        GymsComponent,
        UsersComponent,
        GymnastsComponent,
        GymnastNewComponent,
        GymnastListComponent,
        GymnastItemComponent,
        GymnastDetailComponent
    ],
    imports: [
        BrowserModule,
        HttpClientModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
