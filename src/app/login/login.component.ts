// src/app/components/login/login.component.ts
import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { NavbarConversorComponent } from "../conversor/navbar/navbar-conversor.component";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NavbarConversorComponent],
})
export class LoginComponent {
  loginForm: FormGroup;
  error: string | null = null;

  constructor(private fb: FormBuilder, private auth: AuthService, private router: Router, private route: ActivatedRoute) {
    this.loginForm = this.fb.group({
      username: ['user', Validators.required],
      password: ['user123', Validators.required],
    });

    this.route.queryParams.subscribe(params => {
      if (params['sessionExpired']) {
        this.error = 'Tu sesión ha expirado, por favor vuelve a iniciar sesión.';
      }
    });
  }

  submit(): void {
    if (this.loginForm.invalid) return;

    const { username, password } = this.loginForm.value;
    this.auth.login(username, password).subscribe({
      next: () => this.router.navigate(['/conversor-project']),
      error: () => this.error = 'Usuario o contraseña incorrectos.'
    });
  }
}
