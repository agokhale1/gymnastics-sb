import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

    private returnUrl = '/meets';
    loginForm: FormGroup;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: AuthService,
        private fb: FormBuilder
    ) {
        this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/meets');


        console.log('Login redirect: ' + (this.authService.currentUserValue !== null));

        // Redirect if already logged in
        if (this.authService.currentUserValue !== null) {
            this.success();
        }

        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
    }

    get form() {
        return this.loginForm.controls;
    }

    login() {
        this.submitted = true;

        if (!this.loginForm.valid) {
            return;
        }

        const obs = this.authService.login(this.form.username.value, this.form.password.value);
        obs.subscribe((success: boolean) => {
            if (success) {
                this.success();
            } else {
                alert('Invalid login.');
            }
        },
        (err: HttpErrorResponse) => {

            if (err.status === 401) {
                alert('Invalid username or password.');
            } else {
                alert('Login failed. Could not contact API.');
            }

            this.authService.logout();
        });


    }

    guestLogin() {
        const obs = this.authService.login('guest', '');
        obs.subscribe((success: boolean) => {
            if (success) {
                this.success();
            } else {
                alert('Invalid login.');
            }
        },
        (err: HttpErrorResponse) => {

            if (err.status === 401) {
                alert('Invalid username or password.');
            } else {
                alert('Login failed. Could not contact API.');
            }

            this.authService.logout();
        });
    }

    success() {
        console.log('Nav to: ' + this.returnUrl);
        console.log(this.router);
        this.router.navigateByUrl(this.returnUrl);
        console.log('yo');
    }

}
