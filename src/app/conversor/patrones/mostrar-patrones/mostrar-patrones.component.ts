import { Component } from '@angular/core';
import { Patron } from '../../../models/patron.model';
import { PatronesService } from '../../../services/patrones.service';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router'; // 👈 importa Router
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-mostrar-patrones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mostrar-patrones.component.html',
  styleUrl: './mostrar-patrones.component.css'
})
export class MostrarPatronesComponent {

  patrones: Patron[] = [];

  constructor(
    private patronesService: PatronesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }

    this.patronesService.getAllPatrones().subscribe(response => {
      this.patrones = response.data;
    });
  }
}
