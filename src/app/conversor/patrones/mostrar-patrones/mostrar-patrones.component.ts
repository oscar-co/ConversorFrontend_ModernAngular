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


  get isAdmin(): boolean {
    return this.authService.isAdmin();
  }

  confirmarEliminacion(event: MouseEvent, id: number): void {
    
    event.stopPropagation(); // evita que dispare el routerLink
    const confirmado = window.confirm('¿Estás seguro de que deseas eliminar este certificado?');
    if (confirmado) {
      this.patronesService.deletePatron(id).subscribe({
        next: () => {
          this.patrones = this.patrones.filter(p => p.id !== id);
        },
        error: err => {
          console.error('Error al eliminar el patrón:', err);
          alert('No se pudo eliminar el patrón.');
        }
      });
    }
}


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
