import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CurrentUserService } from '../_services/current-user.service';

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
        private authService: CurrentUserService,
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
        });
    }

    success() {
        console.log('Nav to: ' + this.returnUrl);
        console.log(this.router);
        this.router.navigateByUrl(this.returnUrl);
        console.log('yo');
    }

}
