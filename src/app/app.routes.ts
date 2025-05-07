import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AboutComponent } from './portfolio/about/about.component';
import { PortfolioComponent } from './portfolio/portfolio.component';

export const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  {
    path: 'conversor-project',
    loadChildren: () =>
      import('./conversor/conversor.routes').then(m => m.CONVERSOR_ROUTES)
  }
];