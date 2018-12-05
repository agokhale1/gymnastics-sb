import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { AuthService } from 'src/app/_services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { User, Roles, AUTH_LEVEL } from 'src/app/shared/user.interface';
import { config } from 'src/app/_services/config.interface';
import { HttpClient, HttpResponse } from '@angular/common/http';

@Component({
    selector: 'app-user-new',
    templateUrl: './user-new.component.html',
    styleUrls: ['./user-new.component.css']
})
export class UserNewComponent implements OnInit {

    user: User = {
        user_id: 0,
        login: '',
        password: '',
        auth_level: AUTH_LEVEL.GUEST
    };
    editForm: FormGroup;
    roles = Roles;
    submitted = false;

    constructor(
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router,
        private route: ActivatedRoute,
        private http: HttpClient
    ) {
        this.editForm = this.fb.group({
            login: ['', [Validators.required, Validators.minLength(config.minUsernameLength)]],
            password: ['', [Validators.required, Validators.minLength(config.minPasswordLength)]],
            auth_level: ['', Validators.nullValidator]
        });

        this.editForm.patchValue(this.user);
    }

    get form() {
        return this.editForm.controls;
    }

    levels(): Array<string> {
        const keys = Object.keys(AUTH_LEVEL);

        // Only return the numeric keys
        return keys.slice(0, keys.length / 2);
    }

    ngOnInit() {
    }

    cancel() {
        this.router.navigateByUrl(`/users`);
    }

    update() {
        this.submitted = true;

        if (!this.editForm.valid) {
            return;
        }

        this.user = this.editForm.value;

        console.log(this.user);

        this.http.post<User>(`${config.apiUrl}/records/users`,
            this.user,
            { observe: 'response' }
        )
        .subscribe((resp: HttpResponse<any>) => {
            if (!resp.ok) {
                alert(`Could not update user.\nHTTP Response: ${resp.status} ${resp.statusText}`);
            } else {
                console.log(resp.body);
                // Navigate back to the list
                this.router.navigateByUrl(`/users#${this.user.user_id}`);
            }
        },
        err => {
            alert(`Could not update user. Server responded with ${err.status} ${err.statusText}`);
        });
    }

}
