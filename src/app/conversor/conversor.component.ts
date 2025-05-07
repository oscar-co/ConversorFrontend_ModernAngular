import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarConversorComponent } from "./navbar/navbar-conversor.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-conversor',
  standalone: true,
  imports: [RouterOutlet, CommonModule, NavbarConversorComponent],
  templateUrl: './conversor.component.html',
  styleUrls: ['./conversor.component.css']
})
export class ConversorComponent {}
