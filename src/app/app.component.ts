import { Component } from '@angular/core';
import { PortfolioComponent } from "./portfolio/portfolio.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, PortfolioComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Conversor Patrones';
  currentYear: number = new Date().getFullYear();
}
