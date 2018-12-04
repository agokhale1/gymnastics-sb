import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CurrentUserService } from '../users/services/current-user.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private returnUrl = '';

    constructor(private route: ActivatedRoute, private router: Router, private authService: CurrentUserService) {
        // Redirect if already logged in

        console.log(this.authService.currentUserValue);

        if (this.authService.currentUserValue) {
            this.router.navigate(['/meets']);
        }
    }

    ngOnInit() {
        this.route.queryParams
            .subscribe(params => this.returnUrl = params['return'] || '/meets');
    }

    login() {
        const success: boolean = this.authService.login('', '');

        if (success) {
            this.success();
        } else {
            alert('Invalid login.');
        }
    }

    guestLogin() {
        this.authService.login('guest', '');
        this.success();
    }

    success() {
        this.router.navigateByUrl(this.returnUrl);
    }

}
