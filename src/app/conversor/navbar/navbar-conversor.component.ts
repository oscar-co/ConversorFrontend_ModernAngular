import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar-conversor',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './navbar-conversor.component.html',
  styleUrl: './navbar-conversor.component.css'
})
export class NavbarConversorComponent {
  constructor(private auth: AuthService, private router: Router) {}

  get isLoggedIn(): boolean {
    return this.auth.isLoggedIn();
  }

  get isAdmin(): boolean {
    return this.auth.isAdmin();
  }

  get username(): string {
    return this.auth.getUsername() ?? 'Usuario';
  }

  get userRole(): string {
    return this.auth.getUserRole() ?? '';
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/login']);
  }
}