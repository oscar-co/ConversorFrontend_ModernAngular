import { Component } from '@angular/core';
import { Patron } from '../../../../models/patron.model';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { PatronesService } from '../../../../services/patrones.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../../../services/auth.service';

@Component({
  selector: 'app-mostrar-patron',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mostrar-patron.component.html',
  styleUrl: './mostrar-patron.component.css'
})
export class MostrarPatronComponent {

  patron?: Patron;

  constructor(
    private route: ActivatedRoute,
    private patronesService: PatronesService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']);
      return;
    }
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.patronesService.getPatronById(id).subscribe({
    next: response => {
      this.patron = response.data ?? null;
    },
    error: err => {
      console.error('Error al obtener el patrón:', err);
    }
  });
  }
}