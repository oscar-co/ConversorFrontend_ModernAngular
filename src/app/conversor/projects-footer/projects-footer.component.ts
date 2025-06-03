import { Component } from '@angular/core';

@Component({
  selector: 'app-projects-footer',
  imports: [],
  templateUrl: './projects-footer.component.html',
  styleUrl: './projects-footer.component.css'
})
export class ProjectsFooterComponent {

    currentYear = new Date().getFullYear();
}
