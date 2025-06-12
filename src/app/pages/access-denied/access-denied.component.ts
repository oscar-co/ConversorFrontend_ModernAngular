import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NavbarConversorComponent } from "../../conversor/navbar/navbar-conversor.component";

@Component({
  standalone: true,
  selector: 'app-access-denied',
  imports: [RouterModule, NavbarConversorComponent],
  template: `
    <app-navbar-conversor></app-navbar-conversor>
    <div class="container mt-5 pt-5 text-center">
      <h1 class="text-danger">403 - Acceso denegado</h1>
      <p>No tienes permiso para ver esta sección.</p>
      <a [routerLink]="['/conversor-project']" class="btn btn-primary mt-3">Volver al inicio</a>
    </div>
    <footer></footer>
  `
})
export class AccessDeniedComponent {

}
