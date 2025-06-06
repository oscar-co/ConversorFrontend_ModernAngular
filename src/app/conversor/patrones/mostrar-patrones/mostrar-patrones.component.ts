import { Component } from '@angular/core';
import { Patron } from '../../../models/patron.model';
import { PatronesService } from '../../../services/patrones.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-mostrar-patrones',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './mostrar-patrones.component.html',
  styleUrl: './mostrar-patrones.component.css'
})
export class MostrarPatronesComponent {

  patrones: Patron[] = [];

  constructor(private patronesService: PatronesService) {
  }

  ngOnInit(): void {
    this.patronesService.getAllPatrones().subscribe(response => {
      this.patrones = response.data;
      console.log(response);
    });
  }
}
