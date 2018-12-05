import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from '../_services/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

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
        this.handleStatus(obs);
    }

    guestLogin() {
        const obs = this.authService.login('guest', '');
        this.handleStatus(obs);
    }

    handleStatus(obs: Observable<number>) {
        obs.subscribe((status: number) => {
            if (status === 200) {
                this.success();
            } else if (status === 401) {
                this.failure();
                alert('Invalid username or password.');
            } else {
                this.failure();
                alert('Login failed. Error contacting the API.');
            }
        },
        (err: HttpErrorResponse) => {
            this.failure();

            if (err.status === 401) {
                alert('Invalid username or password.');
            } else {
                alert('Login failed. Error contacting the API.');
            }
        });
    }

    success() {
        console.log('Login nav to: ' + this.returnUrl);
        this.router.navigateByUrl(this.returnUrl);
    }

    failure() {
        this.authService.logout();
    }

}
