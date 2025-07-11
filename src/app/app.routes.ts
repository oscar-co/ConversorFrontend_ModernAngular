import { Routes } from '@angular/router';
import { PortfolioComponent } from './portfolio/portfolio.component';
import { LoginComponent } from './login/login.component';
import { AccessDeniedComponent } from './pages/access-denied/access-denied.component';
import { AuthGuard } from './auth/auth.guard';
import { RegisterComponent } from './login/register/register.component';


export const routes: Routes = [
  { path: '', redirectTo: 'portfolio', pathMatch: 'full' },
  { path: 'portfolio', component: PortfolioComponent },
  { path: 'login', component: LoginComponent },
  { path: 'access-denied', component: AccessDeniedComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'conversor-project',
    canActivate: [AuthGuard],
    loadChildren: () =>
      import('./conversor/conversor.routes').then(m => m.CONVERSOR_ROUTES)
  }
];