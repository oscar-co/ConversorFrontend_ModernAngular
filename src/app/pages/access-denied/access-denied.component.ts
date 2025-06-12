import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-access-denied',
  imports: [RouterModule],
  template: `
    <div class="container mt-5 pt-5 text-center">
      <h1 class="text-danger">403 - Acceso denegado</h1>
      <p>No tienes permiso para ver esta sección.</p>
      <a [routerLink]="['/conversor-project']" class="btn btn-primary mt-3">Volver al inicio</a>
    </div>
  `
})
export class AccessDeniedComponent {

}
