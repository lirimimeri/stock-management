import { Component, inject } from "@angular/core";
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { MatButton } from "@angular/material/button";
import { AsyncPipe, JsonPipe, NgIf } from "@angular/common";
import { AuthService } from "./auth.service";
import { LoginForm } from "./auth.types";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";

@Component({
    standalone: true,
    templateUrl: './auth.component.html',
    styleUrls: ['./auth.component.scss'],
    providers:[AuthService],
    imports: [
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatCardModule,
        MatButton,
        NgIf,
        JsonPipe,
        AsyncPipe,
        MatProgressSpinnerModule
    ]
})
export class AuthComponent {
    authService = inject(AuthService);
    private fb = inject(FormBuilder).nonNullable;
    
    cEmail = this.fb.control<string>('', [Validators.required, Validators.email]);
    cPassword = this.fb.control<string>('', [Validators.required, Validators.minLength(6)]);

    fg = this.fb.group({
        email: this.cEmail,
        password: this.cPassword
    }) as FormGroup<LoginForm>;

    send() {
        if (this.fg.invalid) return;
        const { email, password } = this.fg.getRawValue();

        this.authService.authenticate(email, password);
    }
}