import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarConversorComponent } from "./navbar/navbar-conversor.component";
import { Router, RouterOutlet } from '@angular/router';
import { ProjectsFooterComponent } from "./projects-footer/projects-footer.component";
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarConversorComponent, ProjectsFooterComponent],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
    }
  }
}