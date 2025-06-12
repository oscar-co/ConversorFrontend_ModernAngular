import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
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

  constructor(private authService: AuthService) {}

  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

}
