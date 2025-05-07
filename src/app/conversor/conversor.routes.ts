import { Routes } from '@angular/router';
import { ConversorComponent } from './conversor.component';
import { ConversorHomeComponent } from './conversor-home/conversor-home.component';
import { ConversionPatronComponent } from './patrones/conversion-patron/conversion-patron.component';
import { ConversorUnidadesComponent } from './conversor-unidades/conversor-unidades.component';


export const CONVERSOR_ROUTES: Routes = [
  {
    path: '',
    component: ConversorComponent,
    children: [
      { path: '', component: ConversorHomeComponent },
      { path: 'conversor-patrones', component: ConversionPatronComponent },
      { path: 'conversor-unidades', component: ConversorUnidadesComponent }
    ]
  }
];