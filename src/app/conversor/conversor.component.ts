import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarConversorComponent } from "./navbar/navbar-conversor.component";
import { RouterOutlet } from '@angular/router';
import { ProjectsFooterComponent } from "./projects-footer/projects-footer.component";

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarConversorComponent, ProjectsFooterComponent],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {}
