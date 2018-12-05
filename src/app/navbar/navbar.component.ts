import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { User, AUTH_LEVEL } from '../shared/user.interface';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    public loggedIn = false;
    public isAdmin = false;

    constructor(private route: ActivatedRoute, private router: Router, private authService: AuthService) {
        this.authService.currentUser.subscribe((user: User) => {
            this.loggedIn = user !== null;
            this.isAdmin = ((user) ? user.auth_level >= AUTH_LEVEL.ADMIN : false);

            console.log('Updated logged in status: ' + this.loggedIn);
        });
    }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}
