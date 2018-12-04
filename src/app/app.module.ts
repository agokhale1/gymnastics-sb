import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { LoginComponent } from './login/login.component';
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
        GymnastsComponent,
        GymnastNewComponent,
        GymnastListComponent,
        GymnastItemComponent,
        GymnastDetailComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule { }
