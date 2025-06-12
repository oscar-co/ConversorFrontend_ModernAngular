import { Routes } from '@angular/router';
import { ConversorComponent } from './conversor.component';
import { ConversorHomeComponent } from './conversor-home/conversor-home.component';
import { ConversionPatronComponent } from './patrones/conversion-patron/conversion-patron.component';
import { ConversorUnidadesComponent } from './conversor-unidades/conversor-unidades.component';
import { CrearPatronComponent } from './patrones/crear-patron/crear-patron.component';
import { MostrarPatronComponent } from './patrones/mostrar-patrones/mostrar-patron/mostrar-patron.component';
import { MostrarPatronesComponent } from './patrones/mostrar-patrones/mostrar-patrones.component';
import { AuthGuard } from '../auth/auth.guard';
import { adminGuard } from '../auth/role.guard';


export const CONVERSOR_ROUTES: Routes = [
  {
    path: '', component: ConversorComponent, canActivate: [AuthGuard],
    children: [
      { path: '', component: ConversorHomeComponent },
      { path: 'conversor-patrones', component: ConversionPatronComponent },
      { path: 'conversor-unidades', component: ConversorUnidadesComponent },
      { path: 'nuevo-patron', component: CrearPatronComponent, canActivate: [adminGuard]},
      { path: 'mostrar-todos-patrones', component: MostrarPatronesComponent},
      { path: 'mostrar-patron/:id', component: MostrarPatronComponent}
    ]
  }
];