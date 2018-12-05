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

    private returnUrl = '';
    loginForm: FormGroup;
    submitted = false;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authService: CurrentUserService,
        private fb: FormBuilder
    ) {
        // Redirect if already logged in

        console.log('Login redirect: ' + (this.authService.currentUserValue !== null));

        if (this.authService.currentUserValue !== null) {
            this.router.navigate(['/meets']);
        }

        this.loginForm = this.fb.group({
            username: ['', [Validators.required, Validators.minLength(3)]],
            password: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    ngOnInit() {
        this.route.queryParams.subscribe(params => this.returnUrl = params['return'] || '/meets');
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
        this.router.navigateByUrl(this.returnUrl);
    }

}
