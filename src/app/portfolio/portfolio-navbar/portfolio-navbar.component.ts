import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-portfolio-navbar',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './portfolio-navbar.component.html',
  styleUrl: './portfolio-navbar.component.css'
})
export class PortfolioNavbarComponent {
  @ViewChild('navbarCollapse') navbarCollapse!: ElementRef;

  scrollToSection(id: string) {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }

    // Cierra el menú colapsable si está abierto (modo móvil)
    if (this.navbarCollapse) {
      this.navbarCollapse.nativeElement.classList.remove('show');
    }
  }
}
