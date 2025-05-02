import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ConversorComponent } from './conversor/conversor.component';
import { ConversionPatronComponent } from './patrones/conversion-patron/conversion-patron.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent, title: 'Inicio' },
  { path: 'conversor', component: ConversorComponent, title: 'Conversor' },
  { path: 'conversorPatron', component: ConversionPatronComponent, title: 'Conversor Patrón' },
  { path: '**', redirectTo: 'home', pathMatch: 'full' }
];