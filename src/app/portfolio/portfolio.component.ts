import { Component } from '@angular/core';
import { ProjectsComponent } from "./projects/projects.component";
import { HomeComponent } from "./home/home.component";
import { AboutComponent } from "./about/about.component";
import { ContactComponent } from "./contact/contact.component";
import { PortfolioNavbarComponent } from "./portfolio-navbar/portfolio-navbar.component";
import { FooterComponent } from "./footer/footer.component";

@Component({
  selector: 'app-portfolio',
  imports: [ProjectsComponent, HomeComponent, AboutComponent, ContactComponent, PortfolioNavbarComponent, FooterComponent],
  templateUrl: './portfolio.component.html',
  styleUrl: './portfolio.component.css'
})
export class PortfolioComponent {

}
