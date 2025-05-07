import { Component } from '@angular/core';
import {  } from "../navbar/navbar-conversor.component";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-conversor-home',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './conversor-home.component.html',
  styleUrl: './conversor-home.component.css'
})
export class ConversorHomeComponent {

  currentYear: number = new Date().getFullYear();
}
