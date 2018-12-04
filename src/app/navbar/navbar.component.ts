import { Component, OnInit } from '@angular/core';
import { CurrentUserService } from '../users/services/current-user.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, private authService: CurrentUserService) { }

    ngOnInit() { }

    logout() {
        this.authService.logout();
        this.router.navigate(['/login']);
    }

}