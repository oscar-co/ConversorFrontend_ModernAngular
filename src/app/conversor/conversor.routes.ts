import { Routes } from '@angular/router';
import { ConversorComponent } from './conversor.component';
import { ConversorHomeComponent } from './conversor-home/conversor-home.component';
import { ConversionPatronComponent } from './patrones/conversion-patron/conversion-patron.component';
import { ConversorUnidadesComponent } from './conversor-unidades/conversor-unidades.component';
import { CrearPatronComponent } from './patrones/crear-patron/crear-patron.component';


export const CONVERSOR_ROUTES: Routes = [
  {
    path: '',
    component: ConversorComponent,
    children: [
      { path: '', component: ConversorHomeComponent },
      { path: 'conversor-patrones', component: ConversionPatronComponent },
      { path: 'conversor-unidades', component: ConversorUnidadesComponent },
      { path: 'conversor-patrones-crear-nuevo', component: CrearPatronComponent}
    ]
  }
];