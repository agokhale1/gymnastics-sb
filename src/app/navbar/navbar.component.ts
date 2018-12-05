import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../users/services/current-user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User } from '../shared/user.interface';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public loggedIn = false;

    constructor(private route: ActivatedRoute, private router: Router, private authService: CurrentUserService) {
        this.authService.currentUser.subscribe((user: User) => {
            this.loggedIn = user !== null;
            console.log('Updated logged in status: ' + this.loggedIn);
        });
    }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
