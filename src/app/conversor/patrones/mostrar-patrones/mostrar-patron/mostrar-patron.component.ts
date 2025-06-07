import { Component } from '@angular/core';
import { Patron } from '../../../../models/patron.model';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { PatronesService } from '../../../../services/patrones.service';
import { CommonModule } from '@angular/common';

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
    private patronesService: PatronesService
  ) {}

  ngOnInit(): void {
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