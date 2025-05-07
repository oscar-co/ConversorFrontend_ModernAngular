import { Component } from '@angular/core';
import { ProjectsComponent } from "./projects/projects.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { PortfolioNavbarComponent } from "./portfolio-navbar/portfolio-navbar.component";

@Component({
  selector: 'app-portfolio',
  imports: [ProjectsComponent, HomeComponent, AboutComponent, ContactComponent, PortfolioNavbarComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
